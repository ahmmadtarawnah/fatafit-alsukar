import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logoImg from "../../Shared/Screenshot_2025-05-09_132412-removebg-preview (1).png";
import Cookies from "js-cookie";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      if (formData.email === "admin@gmail.com") {
        // Admin login
        const response = await axios.post("http://localhost:5000/api/login", formData);
        const token = response.data.token;
        Cookies.set("adminToken", token, { expires: 1 });
        toast.success("تم تسجيل دخول المدير بنجاح!", {
          duration: 2000,
          style: {
            borderLeft: '4px solid #4ade80',
            padding: '1rem',
            minWidth: '300px',
            maxWidth: '90vw',
          },
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        // User login
        const { data } = await axios.post("http://localhost:5000/api/users/login", formData, {
          withCredentials: true,
        });

        if (data.mustChangePassword) {
          toast.success("تم تسجيل الدخول... يرجى تغيير كلمة المرور المؤقتة.", {
            duration: 2000,
            style: {
              borderLeft: '4px solid #4ade80',
              padding: '1rem',
              minWidth: '300px',
              maxWidth: '90vw',
            },
          });
          setTimeout(() => {
            navigate("/changepassword");
          }, 2000);
        } else {
          toast.success(data.message, {
            duration: 2000,
            style: {
              borderLeft: '4px solid #4ade80',
              padding: '1rem',
              minWidth: '300px',
              maxWidth: '90vw',
            },
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ ما", {
        duration: 2000,
        style: {
          backgroundColor: '#fef2f2',
          borderLeft: '4px solid #f87171',
          padding: '1rem',
          minWidth: '300px',
          maxWidth: '90vw',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
          },
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white bg-opacity-90 backdrop-blur-sm mb-4 overflow-hidden border-2 border-white border-opacity-30 shadow-xl transform hover:scale-105 transition-transform duration-300">
            <img
              src={logoImg}
              alt="فتافيت السكَر"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                e.target.onerror = null;
              }}
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بعودتك!</h1>
          <p className="text-gray-600">سجل دخولك للوصول إلى حسابك</p>
        </div>

        {/* Login Form */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-right ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-200'
                      : formData.email
                        ? 'border-blue-500 focus:ring-blue-200'
                        : 'border-gray-200 focus:ring-gray-200'
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="أدخل كلمة المرور"
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-right ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-200'
                      : formData.password
                        ? 'border-blue-500 focus:ring-blue-200'
                        : 'border-gray-200 focus:ring-gray-200'
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري تسجيل الدخول...
                </div>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center">
            <Link
              to="/changepassword"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}