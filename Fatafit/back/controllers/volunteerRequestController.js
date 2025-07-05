const VolunteerRequest = require("../models/VolunteerRequest");
const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// GET /api/requests/volunteer/count
exports.getVolunteerRequestCount = async (req, res) => {
  try {
    const count = await VolunteerRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "فشل في جلب عدد طلبات التطوع", error: err });
  }
};

// GET /api/requests/volunteer/count
exports.getVolunteerRequestCount = async (req, res) => {
  try {
    const count = await VolunteerRequest.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد طلبات التطوع", error: err });
  }
};

// GET /api/requests/volunteer
exports.getAllVolunteerRequests = async (req, res) => {
  try {
    const requests = await VolunteerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب الطلبات", error: err });
  }
};

// PUT /api/requests/volunteer/:id
exports.updateVolunteerRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await VolunteerRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "فشل في تحديث الحالة", error: err });
  }
};

// Approve or suspend a volunteer request
exports.approveVolunteerRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, fullName } = req.body;

    // Find the request
    const request = await VolunteerRequest.findById(id);
    if (!request) return res.status(404).json({ message: "الطلب غير موجود" });

    let newStatus;
    let message;

    if (request.status === "approved") {
      // If already approved, suspend it
      newStatus = "pending";
      message = "تم تعليق الطلب بنجاح";
      // Optionally, disable the user account
      const user = await User.findOne({ email });
      if (user) {
        user.isApproved = false;
        await user.save();
      }
      // Try to send suspension email
      try {
        await sendSuspensionEmail(email, `تم تعليق طلبك. يرجى التواصل مع الدعم لمزيد من المعلومات.`);
      } catch (emailError) {
        console.error("Failed to send suspension email:", emailError);
      }
    } else {
      // If pending, approve it
      newStatus = "approved";
      message = "تمت الموافقة على الطلب بنجاح";
      let user = await User.findOne({ email });
      if (!user) {
        const randomPassword = crypto.randomBytes(6).toString("hex");
        const newUser = new User({
          fullName,
          email,
          password: randomPassword,
          role: "user",
          isApproved: true,
          mustChangePassword: true,
        });
        await newUser.save();
        try {
          await sendApprovalEmail(email, `تمت الموافقة على طلبك.\n\nكلمة المرور المؤقتة: ${randomPassword}\nيرجى تسجيل الدخول وتغيير كلمة المرور.`);
        } catch (emailError) {
          console.error("Failed to send approval email:", emailError);
        }
      } else {
        user.isApproved = true;
        await user.save();
        try {
          await sendApprovalEmail(email, `تمت الموافقة على طلبك. يمكنك الآن الدخول للنظام.`);
        } catch (emailError) {
          console.error("Failed to send approval email:", emailError);
        }
      }
    }
    request.status = newStatus;
    await request.save();
    res.status(200).json({ message, newStatus, requestId: id });
  } catch (err) {
    console.error("Error processing volunteer request:", err);
    res.status(500).json({ message: "حدث خطأ أثناء معالجة الطلب" });
  }
};

// Send approval email
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
    subject: "Volunteer Request Approved",
    text,
  });
}

// Send suspension email
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
    subject: "Volunteer Request Suspended",
    text,
  });
}