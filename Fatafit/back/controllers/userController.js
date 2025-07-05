const User = require("../models/User");
const jwt = require("jsonwebtoken");

// إنشاء توكن JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

exports.checkAuth = (req, res) => {
  res.status(200).json({
    isAuthenticated: true,
    user: req.user,
  });
};

// تسجيل الدخول
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    // ❗️ التحقق من موافقة الأدمن
    if (!user.isApproved) {
      return res
        .status(403)
        .json({ message: "لم يتم الموافقة على حسابك بعد من قبل الإدارة" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const token = generateToken(user._id);

    // إرسال الـ Token في الكوكيز
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "تم تسجيل الدخول بنجاح",
      mustChangePassword: user.mustChangePassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "كلمة المرور الحالية غير صحيحة" });
    }

    user.password = newPassword;
    user.mustChangePassword = false;
    await user.save();

    res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  try {
    // مسح الكوكيز
    res.clearCookie("token");

    // إرجاع استجابة بعد تسجيل الخروج
    res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء تسجيل الخروج" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // لا ترجع كلمة المرور
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

// GET /api/users/count-by-role/user
exports.getUserCountByRole = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "user" });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد المستخدمين", error: err });
  }
};

// GET /api/users/count-by-role/user
exports.getUserCountByRole = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "user" });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد المستخدمين", error: err });
  }
};

// تعديل حالة المستخدم (نشط / غير نشط)
exports.updateUserStatus = async (req, res) => {
  try {
    const { isApproved } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "فشل في تحديث المستخدم",
      error: error.message,
    });
  }
};

exports.getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "فشل في جلب عدد المستخدمين", error: err });
  }
};

// controllers/userController.js
exports.getLoggedInUser = async (req, res) => {
  try {
    // ممكن نحذف كلمة السر قبل الإرسال لو مش عامل `.select('-password')`
    const user = req.user.toObject();
    delete user.password;

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب بيانات المستخدم",
    });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { fullName, email },
      { new: true, runValidators: true }
    ).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "حدث خطأ أثناء تحديث الملف الشخصي" });
  }
};
