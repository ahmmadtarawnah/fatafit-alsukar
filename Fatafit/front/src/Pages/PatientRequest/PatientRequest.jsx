import { useState, useEffect } from "react";

export default function PatientRequest() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    serviceType: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phonenumber: "",
    serviceType: "",
  });

  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [policyError, setPolicyError] = useState("");

  // Simulate URL params - you can replace this with your actual routing solution
  const [urlParams] = useState(new URLSearchParams(window.location.search));

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          credentials: "include", // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log(userData.user);
          // Auto-fill form with user data
          setFormData((prev) => ({
            ...prev,
            fullName: userData.user.fullName || "",
            email: userData.user.email || "",
          }));
          setIsUserLoggedIn(true);
        } else {
          // User is not logged in or token is invalid
          setIsUserLoggedIn(false);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setIsUserLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من الخادم");
        }
        const data = await response.json();
        setServices(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const serviceIdFromUrl = urlParams.get("serviceType");
    if (serviceIdFromUrl) {
      setFormData((prev) => ({ ...prev, serviceType: serviceIdFromUrl }));
    }
  }, [urlParams]);

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
        } else if (!/^[\u0600-\u06FF\s]{3,100}$/.test(value.trim())) {
          error = "يجب أن يحتوي الاسم على أحرف عربية فقط";
        }
        break;

      case "email":
        if (!value) {
          error = "البريد الإلكتروني مطلوب";
        } else if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
        ) {
          error = "البريد الإلكتروني غير صالح";
        }
        break;

      case "phonenumber":
        if (!value) {
          error = "رقم الهاتف مطلوب";
        } else if (
          !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
            value
          )
        ) {
          error = "رقم الهاتف غير صالح";
        }
        break;

      case "serviceType":
        if (!value) {
          error = "نوع الخدمة مطلوب";
        }
        break;

      case "additionalInfo":
        if (value && value.length > 1000) {
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

    // Validate the field when it changes
    if (errors[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        invalidFiles.push(file.name);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(file.name);
        return;
      }

      validFiles.push(file);
    });

    if (invalidFiles.length > 0) {
      setMessage(
        `الملفات التالية تم رفضها: ${invalidFiles.join(
          ", "
        )}. يرجى التأكد من أن الملفات بصيغة JPG, PNG أو PDF وحجمها لا يتجاوز 5MB`
      );
      return;
    }

    setAttachments((prev) => [...prev, ...validFiles]);
    setMessage("");
  };

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key !== "additionalInfo") {
        // Skip validation for optional fields
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    // Check privacy and terms
    if (!privacyChecked || !termsChecked) {
      setPolicyError("يجب الموافقة على سياسة الخصوصية والشروط والأحكام");
      isValid = false;
    } else {
      setPolicyError("");
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setMessage("");

    if (!validateForm()) {
      setMessage("الرجاء تصحيح الأخطاء في النموذج");
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();

    // Add form fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Add files
    if (attachments.length > 0) {
      attachments.forEach((file) => {
        data.append("attachments", file);
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const responseData = await res.json();

      if (res.ok) {
        setMessage(responseData.message);
        setSuccess(true);
        setFormData({
          fullName: "",
          email: "",
          phonenumber: "",
          serviceType: "",
          additionalInfo: "",
        });
        setAttachments([]);
        setErrors({
          fullName: "",
          email: "",
          phonenumber: "",
          serviceType: "",
        });
      } else {
        // Handle validation errors from backend
        if (responseData.errors) {
          const newErrors = {};
          responseData.errors.forEach((err) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
          setMessage("الرجاء تصحيح الأخطاء في النموذج");
        } else {
          throw new Error(responseData.message || "حدث خطأ أثناء إرسال الطلب");
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMessage(err.message || "حدث خطأ أثناء إرسال الطلب");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">
            جاري تحميل البيانات...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
          <div className="text-red-500 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen lg:px-40 md:px-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-8"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">طلب خدمة</h1>
          <p className="text-gray-600">للمرضى المصابين بالسكري</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                المعلومات الشخصية
              </h3>

              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="الاسم الكامل"
                    className={`w-full border-2 ${
                      errors.fullName ? "border-red-500" : "border-gray-200"
                    } p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right ${
                      isUserLoggedIn ? "bg-blue-50" : ""
                    }`}
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 text-right">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="البريد الإلكتروني"
                      className={`w-full border-2 ${
                        errors.email ? "border-red-500" : "border-gray-200"
                      } p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right ${
                        isUserLoggedIn ? "bg-blue-50" : ""
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
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
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 text-right">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="text"
                      name="phonenumber"
                      placeholder="رقم الهاتف"
                      className={`w-full border-2 ${
                        errors.phonenumber
                          ? "border-red-500"
                          : "border-gray-200"
                      } p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right ${
                        isUserLoggedIn ? "bg-blue-50" : ""
                      }`}
                      value={formData.phonenumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
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
                  </div>
                  {errors.phonenumber && (
                    <p className="mt-1 text-sm text-red-600 text-right">
                      {errors.phonenumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Service Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                معلومات الخدمة
              </h3>

              <div>
                <div className="relative">
                  <select
                    name="serviceType"
                    className={`w-full border-2 ${
                      errors.serviceType ? "border-red-500" : "border-gray-200"
                    } p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right appearance-none bg-white`}
                    value={formData.serviceType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="">اختر نوع الخدمة</option>
                    {services.map((s, index) => (
                      <option key={index} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.serviceType && (
                  <p className="mt-1 text-sm text-red-600 text-right">
                    {errors.serviceType}
                  </p>
                )}
              </div>

              <div className="relative">
                <textarea
                  name="additionalInfo"
                  placeholder="معلومات إضافية أو ملاحظات خاصة (اختياري)"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right resize-none"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
                إرفاق ملفات (اختياري)
              </h3>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  multiple
                  className="w-full border-2 border-dashed border-gray-300 px-4 py-6 rounded-lg hover:border-blue-400 transition-colors duration-200 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer"
                />
                <p className="text-sm text-gray-500 mt-2">
                  يمكنك إرفاق التقارير الطبية أو الصور بصيغة JPG, PNG أو PDF
                </p>
                {attachments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                      >
                        <span className="text-sm text-gray-600">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Privacy and Terms Checkboxes */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="flex items-center text-right cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={privacyChecked}
                  onChange={(e) => setPrivacyChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 ml-2"
                />
                <span>
                  أوافق على{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    سياسة الخصوصية
                  </a>
                </span>
              </label>
              <label className="flex items-center text-right cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600 ml-2"
                />
                <span>
                  أوافق على{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    الشروط والأحكام
                  </a>
                </span>
              </label>
              {policyError && (
                <p className="text-sm text-red-600 text-right mt-1">
                  {policyError}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-300 bg-blue-500 hover:bg-blue-600 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جاري الإرسال...
                  </div>
                ) : (
                  "إرسال الطلب"
                )}
              </button>
            </div>
          </div>

          {/* Success/Error Messages */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl ${
                success
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                {success ? (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="font-medium">{message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>جميع المعلومات المدخلة محفوظة وآمنة</p>
        </div>
      </div>
    </div>
  );
}
