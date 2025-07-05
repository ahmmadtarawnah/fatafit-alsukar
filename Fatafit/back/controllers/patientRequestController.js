const PatientRequest = require("../models/PatientRequest");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// GET /api/requests/patient/count
exports.getPatientRequestCount = async (req, res) => {
  try {
    const count = await PatientRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "فشل في جلب عدد طلبات المستفيدين", error: err });
  }
};

// إرجاع عدد الطلبات لكل نوع خدمة
exports.getPatientRequestsGrouped = async (req, res) => {
  try {
    const grouped = await PatientRequest.aggregate([
      {
        $lookup: {
          from: "services",
          localField: "serviceType",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $group: {
          _id: {
            id: "$service._id",
            name: "$service.name",
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          serviceId: "$_id.id",
          serviceName: "$_id.name",
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error grouping patient requests" });
  }
};

// جلب الطلبات حسب نوع الخدمة
exports.getRequestsByServiceType = async (req, res) => {
  try {
    const { serviceType } = req.params;
    const requests = await PatientRequest.find({ serviceType });
    res.json(requests);
  } catch (error) {
    console.error("فشل في جلب الطلبات حسب النوع:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePatientRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await PatientRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Error updating request status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Updated approveRequest function to handle both approve and suspend actions
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, fullName } = req.body;
    
    // ابحث عن الطلب
    const request = await PatientRequest.findById(id);
    if (!request) return res.status(404).json({ message: "الطلب غير موجود" });

    let newStatus;
    let message;

    // Toggle status based on current status
    if (request.status === "approved") {
      // If already approved, suspend it
      newStatus = "pending";
      message = "تم تعليق الطلب بنجاح";
      
      // Optionally, you can also disable the user account
      const user = await User.findOne({ email });
      if (user) {
        user.isApproved = false;
        await user.save();
      }
      
      // Try to send suspension email, but don't fail if it doesn't work
      try {
        await sendSuspensionEmail(email, `Your request has been suspended. Please contact support for more information.`);
      } catch (emailError) {
        console.error("Failed to send suspension email:", emailError);
        // Continue with the process even if email fails
      }
      
    } else {
      // If pending, approve it
      newStatus = "approved";
      message = "تمت الموافقة على الطلب بنجاح";
      
      // افحص هل المستخدم موجود مسبقًا
      let user = await User.findOne({ email });
      if (!user) {
        const randomPassword = crypto.randomBytes(6).toString("hex");
        const newUser = new User({
          fullName,
          email,
          password: randomPassword, // سيتم هاشينغه تلقائيًا بسبب pre-save hook
          role: 'user',
          isApproved: true,
          mustChangePassword: true,
        });
        await newUser.save();
        
        // Try to send approval email with password, but don't fail if it doesn't work
        try {
          await sendApprovalEmail(email, `Your request has been approved.\n\nTemporary password: ${randomPassword}\nPlease login and change your password.`);
        } catch (emailError) {
          console.error("Failed to send approval email:", emailError);
          // Continue with the process even if email fails
        }
      } else {
        // إذا المستخدم موجود فقط أرسل إشعار وفعّل الحساب
        user.isApproved = true;
        await user.save();
        try {
          await sendApprovalEmail(email, `Your request has been approved. You can now access the system.`);
        } catch (emailError) {
          console.error("Failed to send approval email:", emailError);
          // Continue with the process even if email fails
        }
      }
    }

    // حدّث حالة الطلب
    request.status = newStatus;
    await request.save();

    res.status(200).json({ 
      message,
      newStatus,
      requestId: id 
    });
    
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ message: "حدث خطأ أثناء معالجة الطلب" });
  }
};

// دالة إرسال إيميل الموافقة
async function sendApprovalEmail(to, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Fatafit Alsukkar" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Request Approved",
    text,
  });
}


// دالة إرسال إيميل التعليق
async function sendSuspensionEmail(to, text) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Fatafit Alsukkar" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Request Suspended",
    text,
  });
}
