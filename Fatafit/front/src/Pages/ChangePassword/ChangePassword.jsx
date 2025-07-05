import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import fatafitLogo from "../../assets/fl.png";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", newPassword: "", confirmPassword: "" };

    if (!formData.password) {
      newErrors.password = "كلمة المرور الحالية مطلوبة";
      isValid = false;
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "كلمة المرور الجديدة مطلوبة";
      isValid = false;
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل";
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور غير متطابقة";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:5000/api/users/change-password",
        {
          password: formData.password,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      toast.success("تم تغيير كلمة المرور بنجاح، يمكنك الآن استخدام الكلمة الجديدة", {
        duration: 2000,
        style: {
          borderLeft: "4px solid #4ade80",
          padding: "1rem",
          minWidth: "300px",
          maxWidth: "90vw",
        },
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ ما أثناء تغيير كلمة المرور",
        {
          duration: 2000,
          style: {
            backgroundColor: "#fef2f2",
            borderLeft: "4px solid #f87171",
            padding: "1rem",
            minWidth: "300px",
            maxWidth: "90vw",
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-8"
      dir="rtl"
      style={{
        background: "linear-gradient(135deg, #4A90E2 0%, #3564b8 100%)",
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "12px",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />

      <div className="w-[500px] mx-auto p-4 py-30 max-w-xs min-h-screen">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white bg-opacity-20 backdrop-blur-sm mb-4 overflow-hidden border-2 border-white border-opacity-30">
            <img
              src={fatafitLogo}
              alt="فتافيت السكَر"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
          </div>
        </div>

        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: "#1D3E79" }}>
                كلمة المرور الحالية
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5"
                    style={{ color: "#4A90E2" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="أدخل كلمة المرور الحالية"
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-right ${errors.password
                      ? "border-red-500"
                      : formData.password
                        ? "border-[#4A90E2]"
                        : "border-gray-200"
                    }`}
                  style={{
                    boxShadow: formData.password
                      ? "0 0 0 3px rgba(74, 144, 226, 0.1)"
                      : "none",
                  }}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: "#1D3E79" }}>
                كلمة المرور الجديدة
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5"
                    style={{ color: "#4A90E2" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="أدخل كلمة المرور الجديدة"
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-right ${errors.newPassword
                      ? "border-red-500"
                      : formData.newPassword
                        ? "border-[#4A90E2]"
                        : "border-gray-200"
                    }`}
                  style={{
                    boxShadow: formData.newPassword
                      ? "0 0 0 3px rgba(74, 144, 226, 0.1)"
                      : "none",
                  }}
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium" style={{ color: "#1D3E79" }}>
                تأكيد كلمة المرور الجديدة
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5"
                    style={{ color: "#4A90E2" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="أعد إدخال كلمة المرور الجديدة"
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-right ${errors.confirmPassword
                      ? "border-red-500"
                      : formData.confirmPassword
                        ? "border-[#4A90E2]"
                        : "border-gray-200"
                    }`}
                  style={{
                    boxShadow: formData.confirmPassword
                      ? "0 0 0 3px rgba(74, 144, 226, 0.1)"
                      : "none",
                  }}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mb-2 py-3 px-4 rounded-xl text-white font-semibold text-lg bg-[#3564b8] hover:bg-[#2b559e] transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري تغيير كلمة المرور...
                </div>
              ) : (
                "تغيير كلمة المرور"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}