import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function VolunteerRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    birthDate: "",
    additionalInfo: "",
  });
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    birthDate: "",
    additionalInfo: "",
  });
  
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phonenumber: false,
    birthDate: false,
    additionalInfo: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "الاسم الكامل مطلوب";
        } else if (value.trim().length < 3) {
          error = "يجب أن يكون الاسم على الأقل 3 أحرف";
        } else if (value.trim().length > 100) {
          error = "يجب أن لا يتجاوز الاسم 100 حرف";
        } else if (!/^[A-Za-z0-0-FF\s'-]{3,100}$/.test(value.trim())) {
          error = "يجب أن يحتوي الاسم على أحرف عربية أو إنجليزية فقط";
        }
        break;

      case "email":
        if (!value) {
          error = "البريد الإلكتروني مطلوب";
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          error = "البريد الإلكتروني غير صالح";
        }
        break;

      case "phonenumber":
        if (!value) {
          error = "رقم الهاتف مطلوب";
        } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)) {
          error = "رقم الهاتف غير صالح";
        }
        break;

      case "birthDate":
        if (!value) {
          error = "تاريخ الميلاد مطلوب";
        } else {
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          
          if (birthDate > today) {
            error = "تاريخ الميلاد لا يمكن أن يكون في المستقبل";
          } else if (age < 18) {
            error = "يجب أن يكون عمرك 18 سنة على الأقل";
          }
        }
        break;

      case "additionalInfo":
        if (!value.trim()) {
          error = "المعلومات الإضافية مطلوبة";
        } else if (value.trim().length < 20) {
          error = "يجب أن تكون المعلومات الإضافية على الأقل 20 حرفاً";
        } else if (value.trim().length > 1000) {
          error = "يجب أن لا تتجاوز المعلومات الإضافية 1000 حرف";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    
    // Validate field on change if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    if (!privacyChecked || !termsChecked) {
      setPolicyError("يجب الموافقة على سياسة الخصوصية والشروط والأحكام");
      isValid = false;
    } else {
      setPolicyError("");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phonenumber: true,
      birthDate: true,
      additionalInfo: true,
    });

    if (!validateForm()) {
      toast.error("الرجاء تصحيح الأخطاء في النموذج");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/requests/volunteer",
        formData
      );

      if (response.data.message) {
        toast.success(response.data.message);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phonenumber: "",
          birthDate: "",
          additionalInfo: "",
        });
        setErrors({});
        setTouched({});
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const newErrors = {};
        error.response.data.errors.forEach(err => {
          newErrors[err.field] = err.message;
        });
        setErrors(newErrors);
        toast.error("الرجاء تصحيح الأخطاء في النموذج");
      } else {
        toast.error(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen lg:px-40 md:px-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-8" dir="rtl">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: '14px',
            maxWidth: '500px',
            padding: '16px',
            margin: '8px',
          },
        }}
      />
      
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">انضم إلى فريق المتطوعين</h1>
          <p className="text-gray-600 text-lg">ساعدنا في دعم مرضى السكري وتقديم الرعاية اللازمة لهم</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                المعلومات الشخصية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="الاسم الكامل"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.fullName}
                    className={`w-full border-2 ${errors.fullName && touched.fullName ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white`}
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    name="phonenumber"
                    placeholder="رقم الهاتف"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.phonenumber}
                    className={`w-full border-2 ${errors.phonenumber && touched.phonenumber ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  {errors.phonenumber && touched.phonenumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.phonenumber}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.email}
                    className={`w-full border-2 ${errors.email && touched.email ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white`}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="date"
                    name="birthDate"
                    placeholder="تاريخ الميلاد"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={formData.birthDate}
                    className={`w-full border-2 ${errors.birthDate && touched.birthDate ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white text-gray-700`}
                  />
                  <label className="absolute -top-2 right-3 bg-white px-1 text-xs text-gray-500">تاريخ الميلاد</label>
                  {errors.birthDate && touched.birthDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.birthDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Motivation Section */}
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                دافعك للتطوع
              </h3>
              
              <textarea
                name="additionalInfo"
                placeholder="أخبرنا عن دافعك للتطوع معنا، خبراتك السابقة، المهارات التي تملكها، والوقت المتاح لديك للتطوع..."
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.additionalInfo}
                className={`w-full border-2 ${errors.additionalInfo && touched.additionalInfo ? 'border-red-500' : 'border-gray-200'} px-4 py-3 rounded-lg focus:border-blue-400 focus:outline-none transition-colors duration-200 bg-gray-50 focus:bg-white resize-none`}
                rows="4"
              />
              {errors.additionalInfo && touched.additionalInfo && (
                <p className="mt-1 text-sm text-red-600">{errors.additionalInfo}</p>
              )}
            </div>

            {/* Volunteer Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-400 mb-6">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 text-blue-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                ما ستحصل عليه كمتطوع:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  شهادة تطوع معتمدة
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  تدريبات متخصصة مجانية
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  خبرة في المجال الطبي
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full ml-2"></span>
                  شبكة تواصل مهنية
                </div>
              </div>
            </div>

            {/* Privacy and Terms Checkboxes */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center text-right cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={e => setPrivacyChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 ml-2"
                />
                <span>
                  أوافق على{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">سياسة الخصوصية</a>
                </span>
              </label>
              <label className="flex items-center text-right cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={e => setTermsChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 ml-2"
                />
                <span>
                  أوافق على{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">الشروط والأحكام</a>
                </span>
              </label>
              {policyError && (
                <p className="text-sm text-red-600 text-right mt-1">{policyError}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center">
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  )}
                  {isSubmitting ? "جاري الإرسال..." : "إرسال طلب التطوع"}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">شكراً لرغبتك في التطوع معنا لخدمة المجتمع ومساعدة مرضى السكري</p>
          <div className="flex justify-center items-center mt-3 space-x-4 space-x-reverse">
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              🤝 العمل الجماعي
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              ❤️ خدمة المجتمع
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm">
              🌟 التطوير المهني
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}