import React, { useState } from "react";
import axios from "axios";
import { GiftIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from "framer-motion";

export default function InKindDonation() {
  const [deviceName, setDeviceName] = useState("");
  const [deviceStatus, setDeviceStatus] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("bring_to_association");
  const [address, setAddress] = useState({
    governorate: "",
    address: "",
    street: "",
    buildingNumber: "",
  });
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await axios.post("/api/donations/items", {
        deviceName,
        deviceStatus,
        deliveryMethod,
        address: deliveryMethod === "association_pickup" ? address : {},
        donorName,
        donorPhone,
      });
      setSuccess(true);
      setMessage("تم استلام تبرعك العيني بنجاح!");
      setDeviceName("");
      setDeviceStatus("");
      setDeliveryMethod("bring_to_association");
      setAddress({ governorate: "", address: "", street: "", buildingNumber: "" });
      setDonorName("");
      setDonorPhone("");
    } catch (err) {
      setSuccess(false);
      setMessage("حدث خطأ أثناء الإرسال.");
    }
    setLoading(false);
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
            تبرع عيني / أجهزة لدعم مستفيدي فتافيت السكر
          </h1>
          <p className="text-gray-600">ساهم معنا في دعم الأطفال المصابين بالسكري عبر التبرع بالأجهزة أو المستلزمات</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                بيانات الجهاز
              </h3>
              <div>
                <label className="block mb-1 font-medium">اسم الجهاز</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                  value={deviceName}
                  onChange={e => setDeviceName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">حالة الجهاز</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                  value={deviceStatus}
                  onChange={e => setDeviceStatus(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                طريقة التسليم
              </h3>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="bring_to_association"
                    checked={deliveryMethod === "bring_to_association"}
                    onChange={() => setDeliveryMethod("bring_to_association")}
                  />
                  <span className="ml-2">سأحضر الجهاز إلى الجمعية</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="association_pickup"
                    checked={deliveryMethod === "association_pickup"}
                    onChange={() => setDeliveryMethod("association_pickup")}
                  />
                  <span className="ml-2">أرغب بأن تأتي الجمعية لاستلام الجهاز من منزلي</span>
                </label>
              </div>
              <AnimatePresence>
                {deliveryMethod === "association_pickup" && (
                  <motion.div
                    key="address-form"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="space-y-2 border rounded-xl p-4 bg-blue-50"
                  >
                    <div>
                      <label className="block mb-1 font-medium">المحافظة</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                        value={address.governorate}
                        onChange={e => setAddress({ ...address, governorate: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">الحي/العنوان</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                        value={address.address}
                        onChange={e => setAddress({ ...address, address: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">الشارع</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                        value={address.street}
                        onChange={e => setAddress({ ...address, street: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium">رقم البناية</label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                        value={address.buildingNumber}
                        onChange={e => setAddress({ ...address, buildingNumber: e.target.value })}
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                بيانات المتبرع
              </h3>
              <div>
                <label className="block mb-1 font-medium">اسم المتبرع</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                  value={donorName}
                  onChange={e => setDonorName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">رقم الهاتف</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 text-right text-lg"
                  value={donorPhone}
                  onChange={e => setDonorPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? "جاري الإرسال..." : "إرسال التبرع"}
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