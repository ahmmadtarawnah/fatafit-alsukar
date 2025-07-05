const PatientRequest = require("../models/PatientRequest");
const VolunteerRequest = require("../models/VolunteerRequest");
const MembershipRequest = require("../models/MembershipRequest");
const Service = require("../models/Service"); // أضفنا هذا
const { patientRequestSchema } = require("../validations/requestValidation");
const { volunteerRequestSchema } = require("../validations/volunteerRequestValidation");

exports.createRequest = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    
    const { fullName, email, phonenumber, serviceType, additionalInfo } = req.body;
    const files = req.files;

    // Validate request body
    const { error } = patientRequestSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "خطأ في البيانات المدخلة",
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    // إنشاء الطلب الجديد
    const newRequest = await PatientRequest.create({
      fullName,
      email,
      phonenumber,
      serviceType,
      additionalInfo,
      attachments: files ? files.map(file => file.filename) : [], // نخزن أسماء الملفات
    });

    // ✅ تحديث service بإضافة id المستخدم إلى requestedBy
    await Service.findByIdAndUpdate(
      serviceType,
      { $addToSet: { requestedBy: newRequest._id } }, // addToSet بيمنع التكرار
      { new: true }
    );

    res.status(201).json({ message: "تم إرسال الطلب بنجاح، بانتظار الموافقة" });
  } catch (error) {
    console.error('Error in createRequest:', error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء إرسال الطلب", error: error.message });
  }
};

// تطوع
exports.createVolunteerRequest = async (req, res) => {
  try {
    const { fullName, email, phonenumber, birthDate, additionalInfo } = req.body;

    // Validate request body
    const { error } = volunteerRequestSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "خطأ في البيانات المدخلة",
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    const existing = await VolunteerRequest.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "تم إرسال طلب تطوع سابقًا بنفس البريد." });
    }

    await VolunteerRequest.create({
      fullName,
      email,
      phonenumber,
      birthDate,
      additionalInfo,
    });
    res.status(201).json({ message: "تم إرسال طلب التطوع بنجاح." });
  } catch (error) {
    console.error('Error in createVolunteerRequest:', error);
    res
      .status(500)
      .json({ message: "حدث خطأ أثناء الإرسال.", error: error.message });
  }
};

// انتساب
exports.createMembershipRequest = async (req, res) => {
  try {
    const { fullName, email, phonenumber, birthDate, additionalInfo } =
      req.body;

    const existing = await MembershipRequest.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "تم إرسال طلب انتساب سابقًا بنفس البريد." });
    }

    await MembershipRequest.create({
      fullName,
      email,
      phonenumber,
      birthDate,
      additionalInfo,
    });
    res.status(201).json({ message: "تم إرسال طلب الانتساب بنجاح." });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء الإرسال." });
  }
};
