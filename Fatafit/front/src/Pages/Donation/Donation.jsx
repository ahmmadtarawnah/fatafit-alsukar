// src/pages/Donation/Donation.jsx
import React, { useState } from 'react';
import {
  CreditCardIcon,
  DevicePhoneMobileIcon,
  CurrencyDollarIcon,
  GiftIcon,
  ChartBarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const paymentMethods = [
  'بطاقة فيزا',
  'الموقع الإلكتروني لفتافيت السكر',
  'تطبيق فتافيت السكر للهواتف المحمولة',
  'خدمة إي فواتيركم',
  'خدمة كليك',
  'خدمة سمارت لينك',
  'مواقع فتافيت السكر في المراكز التجارية',
  'CAF America',
  'CAF Canada',
  'مركز الاتصال',
  'مقر فتافيت السكر الرئيسي',
  'صناديق جمع التبرعات (الحصّالات)',
  'محفظة UWallet',
  'محفظة Orange Money',
  'محفظة Zain Cash',
  'محفظة دينارك',
  'تطبيق وافي',
  'تطبيق طلبات',
  'تطبيق كريم',
  'الحوالات والاقتطاعات البنكية',
];

// Add payment process steps for each method
const paymentProcesses = {
  'بطاقة فيزا': [
    'أدخل رقم بطاقة فيزا الخاصة بك',
    'أدخل تاريخ انتهاء الصلاحية',
    'أدخل رمز الأمان (CVV)',
    'اضغط على زر التبرع'
  ],
  'الموقع الإلكتروني لفتافيت السكر': [
    'اختر المبلغ المراد التبرع به',
    'أدخل بيانات البطاقة البنكية',
    'تأكد من صحة البيانات',
    'اضغط على زر التبرع'
  ],
  'تطبيق فتافيت السكر للهواتف المحمولة': [
    'قم بتحميل التطبيق من متجر التطبيقات',
    'سجل دخولك أو أنشئ حساباً جديداً',
    'اختر المبلغ المراد التبرع به',
    'اتبع خطوات الدفع في التطبيق'
  ],
  'خدمة إي فواتيركم': [
    'قم بزيارة أقرب مركز إي فواتيركم',
    'اخبر الموظف برغبتك في التبرع لفتافيت السكر',
    'حدد المبلغ المراد التبرع به',
    'ادفع المبلغ وخذ الإيصال'
  ],
  'خدمة كليك': [
    'قم بزيارة أقرب مركز كليك',
    'اخبر الموظف برغبتك في التبرع لفتافيت السكر',
    'حدد المبلغ المراد التبرع به',
    'ادفع المبلغ وخذ الإيصال'
  ],
  'خدمة سمارت لينك': [
    'قم بزيارة أقرب مركز سمارت لينك',
    'اخبر الموظف برغبتك في التبرع لفتافيت السكر',
    'حدد المبلغ المراد التبرع به',
    'ادفع المبلغ وخذ الإيصال'
  ],
  'مواقع فتافيت السكر في المراكز التجارية': [
    'قم بزيارة أحد مراكز فتافيت السكر',
    'اخبر المتطوع برغبتك في التبرع',
    'حدد المبلغ المراد التبرع به',
    'ادفع المبلغ وخذ الإيصال'
  ],
  'CAF America': [
    'قم بزيارة موقع CAF America',
    'اختر فتافيت السكر كجهة التبرع',
    'حدد المبلغ المراد التبرع به',
    'اتبع خطوات الدفع المقدمة'
  ],
  'CAF Canada': [
    'قم بزيارة موقع CAF Canada',
    'اختر فتافيت السكر كجهة التبرع',
    'حدد المبلغ المراد التبرع به',
    'اتبع خطوات الدفع المقدمة'
  ],
  'مركز الاتصال': [
    'اتصل على رقم مركز الاتصال',
    'اخبر الموظف برغبتك في التبرع',
    'حدد المبلغ المراد التبرع به',
    'اتبع تعليمات الموظف لإتمام التبرع'
  ],
  'مقر فتافيت السكر الرئيسي': [
    'قم بزيارة المقر الرئيسي لفتافيت السكر',
    'اخبر الموظف برغبتك في التبرع',
    'حدد المبلغ المراد التبرع به',
    'ادفع المبلغ وخذ الإيصال'
  ],
  'صناديق جمع التبرعات (الحصّالات)': [
    'قم بزيارة أحد مواقع الحصالات',
    'ضع المبلغ المراد التبرع به في الحصالة',
    'تأكد من إغلاق الحصالة بشكل صحيح',
    'خذ صورة للحصالة كإثبات للتبرع'
  ],
  'محفظة UWallet': [
    'افتح تطبيق UWallet',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'محفظة Orange Money': [
    'افتح تطبيق Orange Money',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'محفظة Zain Cash': [
    'افتح تطبيق Zain Cash',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'محفظة دينارك': [
    'افتح تطبيق دينارك',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'تطبيق وافي': [
    'افتح تطبيق وافي',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'تطبيق طلبات': [
    'افتح تطبيق طلبات',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'تطبيق كريم': [
    'افتح تطبيق كريم',
    'اختر خيار التبرع',
    'ابحث عن فتافيت السكر',
    'حدد المبلغ واتبع خطوات الدفع'
  ],
  'الحوالات والاقتطاعات البنكية': [
    'قم بزيارة أقرب فرع بنكي',
    'اخبر الموظف برغبتك في التبرع لفتافيت السكر',
    'قدم رقم حساب فتافيت السكر',
    'حدد المبلغ واتبع خطوات التحويل'
  ]
};

export default function DonatePage() {
  const [currency, setCurrency] = useState('JOD');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState(paymentMethods[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Add state for Visa card form
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('تم استلام تبرعك بنجاح! شكراً لدعمك');
      setSuccess(true);
      setAmount('');
    } catch (error) {
      setMessage('حدث خطأ أثناء معالجة تبرعك. يرجى المحاولة مرة أخرى.');
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render payment method specific form
  const renderPaymentMethodForm = () => {
    switch (method) {
      case 'بطاقة فيزا':
        return (
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                placeholder="رقم البطاقة"
                maxLength="16"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCardIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                  placeholder="CVV"
                  maxLength="3"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right"
                placeholder="اسم حامل البطاقة"
                required
              />
            </div>
          </div>
        );

      case 'خدمة كليك':
        return (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-800">مراكز كليك القريبة</h4>
            </div>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-blue-200 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCardIcon className="w-5 h-5 text-blue-600" />
                  <p className="font-medium text-blue-800">رمز الدفع</p>
                </div>
                <p className="text-2xl font-bold text-blue-600 text-center">fatafet123</p>
                <p className="text-sm text-blue-600 text-center mt-2">قم بتقديم هذا الرمز عند الدفع في أي مركز كليك</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">مركز كليك - عمان</p>
                  <p className="text-blue-600">شارع المدينة المنورة، عمان</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">مركز كليك - الزرقاء</p>
                  <p className="text-blue-600">شارع الملك حسين، الزرقاء</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">مركز كليك - إربد</p>
                  <p className="text-blue-600">شارع الجامعة، إربد</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'خدمة إي فواتيركم':
        return (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-800">مراكز إي فواتيركم القريبة</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">مركز إي فواتيركم - عمان</p>
                  <p className="text-blue-600">شارع الرينبو، عمان</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">مركز إي فواتيركم - الزرقاء</p>
                  <p className="text-blue-600">شارع الأمير محمد، الزرقاء</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'مركز الاتصال':
        return (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <PhoneIcon className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-800">معلومات الاتصال</h4>
            </div>
            <div className="space-y-3">
              <p className="text-blue-700">رقم الهاتف: +962 7 8151 9422</p>
              <p className="text-blue-700">ساعات العمل: 9:00 صباحاً - 5:00 مساءً</p>
              <p className="text-blue-700">يمكنك الاتصال بنا لتقديم تبرعك عبر الهاتف</p>
            </div>
          </div>
        );

      case 'مقر فتافيت السكر الرئيسي':
        return (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
              <h4 className="text-lg font-semibold text-blue-800">معلومات المقر الرئيسي</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">العنوان</p>
                  <p className="text-blue-600">شارع الملكة رانيا العبدالله، عمان</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">رقم الهاتف</p>
                  <p className="text-blue-600">+962 7 8151 9422</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-blue-800">ساعات العمل</p>
                  <p className="text-blue-600">الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">خطوات الدفع:</h4>
            <div className="space-y-3">
              {paymentProcesses[method].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-blue-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen lg:px-40 md:px-20 bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <GiftIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تبرع لدعم مستفيدي فتافيت السكر
          </h1>
          <p className="text-gray-600">ساهم معنا في دعم الأطفال المصابين بالسكري</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Currency Selection Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                اختيار العملة
              </h3>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrency('JOD')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    currency === 'JOD'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  دينار اردني
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                    currency === 'USD'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  دولار امريكي
                </button>
              </div>
            </div>

            {/* Amount Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                المبلغ
              </h3>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                  placeholder="أدخل المبلغ المطلوب التبرع به"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CurrencyDollarIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                طريقة الدفع
              </h3>

              <div className="relative">
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right appearance-none bg-white"
                  required
                >
                  {paymentMethods.map((m, i) => (
                    <option key={i} value={m}>{m}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCardIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Payment Method Specific Form */}
              {renderPaymentMethodForm()}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !amount}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    جاري المعالجة...
                  </div>
                ) : (
                  "تبرع الآن"
                )}
              </button>
            </div>
          </form>

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
          <p>جميع التبرعات تذهب مباشرة لدعم أطفال مستفيدي السكري</p>
        </div>
      </div>
    </div>
  );
}
