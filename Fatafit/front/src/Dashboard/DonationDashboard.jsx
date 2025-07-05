import React, { useEffect, useState } from 'react';
import { DollarSign, Gift, MapPin, Phone, Calendar, User, Truck, Building } from 'lucide-react';
import DashboardHome from './DashboardHome'; // تأكد من المسار الصحيح

const DonationDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/donations')
      .then(res => res.json())
      .then(data => {
        setDonations(data);
        setLoading(false);
      })
      .catch(() => {
        alert('فشل في تحميل التبرعات');
        setLoading(false);
      });
  }, []);

  const totalDonations = donations.length;

  const cashDonations = donations.filter(d => d.type === 'cash').length;
  const inKindDonations = donations.filter(d => d.type !== 'cash').length;
  const totalValue = donations
    .filter(d => d.value)
    .reduce((sum, d) => sum + (parseFloat(d.value) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-slate-600 mt-4 font-medium">جاري تحميل التبرعات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  لوحة التبرعات
                </h1>
                <p className="text-slate-600 text-lg">
                  متابعة وإدارة جميع التبرعات الواردة للجمعية
                </p>
              </div>
              <div className="hidden md:flex bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">إجمالي التبرعات</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{totalDonations}</p>
           
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">التبرعات النقدية</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{cashDonations}</p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">التبرعات العينية</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{inKindDonations}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">القيمة الإجمالية</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{totalValue.toLocaleString()} د.أ</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Donations List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">قائمة التبرعات</h3>
            <p className="text-slate-600 mt-1">جميع التبرعات الواردة مع تفاصيلها الكاملة</p>
          </div>

          <div className="p-6">
            {donations.length === 0 ? (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-r from-slate-100 to-teal-100 p-6 rounded-2xl mb-4">
                    <Gift className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد تبرعات حالياً</h3>
                  <p className="text-slate-500">ستظهر التبرعات هنا عند وصولها</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {donations.map((donation, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Type Badge */}
                      <div className="lg:col-span-2 flex items-center">
                        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          donation.type === 'cash' 
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                            : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                        }`}>
                          {donation.type === 'cash' ? (
                            <>
                              <DollarSign className="w-4 h-4 ml-2" />
                              نقدي
                            </>
                          ) : (
                            <>
                              <Gift className="w-4 h-4 ml-2" />
                              عيني
                            </>
                          )}
                        </div>
                      </div>

                      {/* Description/Item */}
                      <div className="lg:col-span-3">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-slate-100 to-teal-100 p-2 rounded-xl">
                            <Building className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600">الوصف / العنصر</p>
                            <p className="font-semibold text-slate-800 group-hover:text-teal-600 transition-colors duration-300">
                              {donation.type === 'cash' ? donation.description : donation.item}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Value */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-xl">
                            <DollarSign className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600">القيمة</p>
                            <p className="font-bold text-purple-700">
                              {donation.value ? `${donation.value} د.أ` : '-'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Donor Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-2 rounded-xl">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600">المتبرع</p>
                            <p className="font-semibold text-slate-800">{donation.donorName}</p>
                            <div className="flex items-center mt-1">
                              <Phone className="w-3 h-3 text-slate-500 ml-1" />
                              <p className="text-xs text-slate-600">{donation.donorPhone}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Method */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-2 rounded-xl">
                            <Truck className="w-5 h-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600">طريقة التوصيل</p>
                            <p className="text-sm font-semibold text-slate-800">
                              {donation.deliveryMethod === 'bring_to_association'
                                ? 'إحضار إلى الجمعية'
                                : 'استلام من المتبرع'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="lg:col-span-1">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-2 rounded-xl">
                            <Calendar className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600">التاريخ</p>
                            <p className="text-sm font-semibold text-slate-800">
                              {new Date(donation.createdAt).toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Row */}
                    {donation.address && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-red-100 to-rose-100 p-2 rounded-xl">
                            <MapPin className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-600">العنوان</p>
                            <p className="font-semibold text-slate-800">
                              {donation.address.governorate}, {donation.address.street}, {donation.address.buildingNumber}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
    
      </div>
      
    </div>
  );
};

export default DonationDashboard;