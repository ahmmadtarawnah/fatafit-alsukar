import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardErrors, setCardErrors] = useState({});

  useEffect(() => {
    const data = localStorage.getItem('pendingPayment');
    if (!data) {
      navigate('/summer-club');
      return;
    }
    setPaymentData(JSON.parse(data));
  }, [navigate]);

  // Card validation
  const validateCard = () => {
    const errors = {};
    // Simple regex for 16 digit card number
    if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
      errors.cardNumber = 'رقم البطاقة غير صالح';
    }
    if (!cardName.trim()) {
      errors.cardName = 'اسم حامل البطاقة مطلوب';
    }
    // MM/YY format
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) {
      errors.expiry = 'تاريخ الانتهاء غير صالح';
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      errors.cvv = 'رمز التحقق غير صالح';
    }
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async () => {
    if (!paymentData) return;
    if (!validateCard()) return;
    setLoading(true);
    setError('');
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Update registration status in backend
      await axios.post(`http://localhost:5000/api/summer-clubs/${paymentData.clubId}/confirm-payment`, {
        registrationId: paymentData.registrationId
      });
      setSuccess(true);
      localStorage.removeItem('pendingPayment');
      setTimeout(() => {
        navigate('/summer-club');
      }, 3000);
    } catch (err) {
      setError('حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) return null;

  // Check if all card fields are valid
  const allCardValid = cardNumber && cardName && expiry && cvv && Object.keys(cardErrors).length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">تأكيد الدفع</h1>
          {success ? (
            <div className="text-center">
              <div className="text-green-600 text-xl mb-4">تم الدفع بنجاح!</div>
              <div className="text-gray-600">سيتم تحويلك إلى صفحة النوادي الصيفية...</div>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">النادي:</span>
                  <span>{paymentData.clubTitle}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">الاسم:</span>
                  <span>{paymentData.name}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">البريد الإلكتروني:</span>
                  <span>{paymentData.email}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-blue-700">المبلغ المطلوب:</span>
                  <span className="text-blue-700 font-bold">{paymentData.amount} د.أ</span>
                </div>
              </div>

              {/* Card Details Form */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">بيانات البطاقة البنكية</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">رقم البطاقة</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full border-2 rounded-lg p-3 focus:border-blue-400 focus:outline-none transition-colors ${cardErrors.cardNumber ? 'border-red-500' : 'border-gray-200'}`}
                      value={cardNumber}
                      onChange={e => {
                        // Format as 1234 5678 9012 3456
                        let val = e.target.value.replace(/[^\d]/g, '').slice(0,16);
                        val = val.replace(/(.{4})/g, '$1 ').trim();
                        setCardNumber(val);
                        setCardErrors(prev => ({ ...prev, cardNumber: undefined }));
                      }}
                      onBlur={validateCard}
                    />
                    {cardErrors.cardNumber && <p className="text-red-600 text-sm mt-1">{cardErrors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">اسم حامل البطاقة</label>
                    <input
                      type="text"
                      placeholder="كما هو مكتوب على البطاقة"
                      className={`w-full border-2 rounded-lg p-3 focus:border-blue-400 focus:outline-none transition-colors ${cardErrors.cardName ? 'border-red-500' : 'border-gray-200'}`}
                      value={cardName}
                      onChange={e => {
                        setCardName(e.target.value);
                        setCardErrors(prev => ({ ...prev, cardName: undefined }));
                      }}
                      onBlur={validateCard}
                    />
                    {cardErrors.cardName && <p className="text-red-600 text-sm mt-1">{cardErrors.cardName}</p>}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium text-gray-700">تاريخ الانتهاء</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className={`w-full border-2 rounded-lg p-3 focus:border-blue-400 focus:outline-none transition-colors ${cardErrors.expiry ? 'border-red-500' : 'border-gray-200'}`}
                        value={expiry}
                        onChange={e => {
                          // Format as MM/YY
                          let val = e.target.value.replace(/[^\d]/g, '');
                          if (val.length > 2) val = val.slice(0,2) + '/' + val.slice(2,4);
                          setExpiry(val);
                          setCardErrors(prev => ({ ...prev, expiry: undefined }));
                        }}
                        onBlur={validateCard}
                      />
                      {cardErrors.expiry && <p className="text-red-600 text-sm mt-1">{cardErrors.expiry}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium text-gray-700">رمز التحقق (CVV)</label>
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="CVV"
                        className={`w-full border-2 rounded-lg p-3 focus:border-blue-400 focus:outline-none transition-colors ${cardErrors.cvv ? 'border-red-500' : 'border-gray-200'}`}
                        value={cvv}
                        onChange={e => {
                          setCvv(e.target.value.replace(/[^\d]/g, ''));
                          setCardErrors(prev => ({ ...prev, cvv: undefined }));
                        }}
                        onBlur={validateCard}
                      />
                      {cardErrors.cvv && <p className="text-red-600 text-sm mt-1">{cardErrors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-center mb-4">{error}</div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handlePayment}
                  disabled={loading || !cardNumber || !cardName || !expiry || !cvv || Object.keys(cardErrors).some(k => cardErrors[k])}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'جاري معالجة الدفع...' : 'تأكيد الدفع'}
                </button>
                <button
                  onClick={() => navigate('/summer-club')}
                  className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  إلغاء
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 