import react from "react";
import { useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  
} from "recharts";
import { UserPlus, Heart, ThumbsUp, Users,Gift } from "lucide-react";
import PatientRequestsByService from "./PatientRequestsByService";

const StatCard = ({ icon, title, value, gradient, iconColor }) => (
  <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl font-bold text-slate-800 mb-1 group-hover:scale-105 transition-transform duration-300">
          {value}
        </p>
        <p className="text-slate-600 font-medium">{title}</p>
      </div>
      <div className={`bg-gradient-to-r ${gradient} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
        <div className={`${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);
const SuccessStoryForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [story, setStory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, age, story });
    setName("");
    setAge("");
    setStory("");
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="الاسم"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="العمر"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="قصة النجاح"
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
      <button
        type="submit"
        className="bg-teal-600 text-white px-4 py-2 rounded"
      >
        حفظ القصة
      </button>
    </form>
  );
};
export default function DashboardHome({
  membershipCount = 0,
  patientRequestCount = 0,
  volunteerRequestCount = 0,
  userCount = 0,
    totalDonations = 0, // تم إضافة الخاصية الجديدة هنا

  patientRequestsByType = [],
  events = [],
  users = [],
  setActiveTab,
  colors = {},
  monthlyRegistrations = [],
  fetchRequestsByType,
  selectedServiceType,
  detailsRef,
  requestsByType,
  updateStatus,
  setSelectedServiceType,
}) {


    const [showForm, setShowForm] = useState(false);

  const handleStorySubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/success-stories", data);
      alert("تم حفظ قصة النجاح بنجاح!");
      setShowForm(false);
    } catch (error) {
      alert("حدث خطأ أثناء الحفظ.");
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                مرحباً بك في لوحة تحكم جمعية فتافيت السكر
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed">
                هذه النظرة العامة توفر لك معلومات حول نشاطات الجمعية والإحصائيات الهامة.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-2xl shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">   
         <StatCard
            icon={<UserPlus className="w-6 h-6" />}
            title="طلبات الانتساب"
            value={membershipCount}
            gradient="from-emerald-500 to-teal-500"
            iconColor="text-white"
          />
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            title="طلبات المستفيدين"
            value={patientRequestCount}
            gradient="from-pink-500 to-rose-500"
            iconColor="text-white"
          />
          <StatCard
            icon={<ThumbsUp className="w-6 h-6" />}
            title="طلبات التطوع"
            value={volunteerRequestCount}
            gradient="from-amber-500 to-orange-500"
            iconColor="text-white"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            title="إجمالي المستفيدين"
            value={userCount}
            gradient="from-purple-500 to-indigo-500"
            iconColor="text-white"
          />
             <StatCard
            icon={<Gift className="w-6 h-6" />}
            title="إجمالي التبرعات"
            value={totalDonations}
            gradient="from-cyan-500 to-blue-500"
            iconColor="text-white"
          />
          
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="mb-6">
              <p className="text-slate-600">إحصائيات التسجيل خلال الأشهر الخمسة الماضية</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRegistrations}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="patients" name="المستفيدين" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="volunteers" name="المتطوعين" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="memberships" name="طلبات الانتساب" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="users" name="المستفيدين النشطون" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Services */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="mb-6">
              <p className="text-slate-600">أكثر الخدمات طلباً من المستفيدين</p>
            </div>
            <div className="space-y-4">
              {patientRequestsByType.length > 0 ? (
                patientRequestsByType
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        
                        <span className="font-semibold text-slate-800">
                          {item.serviceName}
                        </span>
                      </div>
                      <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {item.count}
                      </span>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-2xl mb-3 inline-block">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-slate-500">لا توجد بيانات حالياً</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patient Requests Component */}
        <PatientRequestsByService
          patientRequestsByType={patientRequestsByType}
          selectedServiceType={selectedServiceType}
          requestsByType={requestsByType}
          fetchRequestsByType={fetchRequestsByType}
          updateStatus={updateStatus}
          detailsRef={detailsRef}
          setSelectedServiceType={setSelectedServiceType}
        />

        {/* Users and Events Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">معلومات المستفيدين</h3>
                  <p className="text-slate-600 mt-1">آخر المستفيدين المسجلين</p>
                </div>
                <button
                  onClick={() => setActiveTab("users")}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  عرض الكل
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700">الاسم</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700">العمر</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700">الحالة</th>
                    <th className="py-4 px-6 text-sm font-semibold text-slate-700">الانضمام</th>
                  </tr>
                </thead>
                <tbody>
                  {[...users].slice(-3).reverse().map((user, index) => (

                    <tr 
                      key={user._id} 
                      className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-slate-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-slate-600">{user.age}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                            user.status === "نشط"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                              : "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-1 ${
                              user.status === "نشط" ? "bg-green-500" : "bg-gray-500"
                            }`}
                          ></div>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">

                        <span className="text-slate-600 text-sm">
  {new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(user.joinDate))}
</span>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">الفعاليات القادمة</h3>
                  <p className="text-slate-600 mt-1">أحدث الفعاليات المجدولة</p>
                </div>
                <button
                  onClick={() => setActiveTab("events")}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  عرض الكل
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[...events].sort((a, b) => new Date(a.date) - new Date(b.date))
                  .filter((e) => new Date(e.date) >= new Date())
                  .slice(0, 3)
                  .map((event, index) => (
                    <div
                      key={event._id}
                      className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse mb-2">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <h4 className="font-bold text-slate-800">{event.name}</h4>
                      </div>
                      <div className="mr-13 space-y-1">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v8m0 0V9a2 2 0 012-2h4a2 2 0 012 2v10m-6 0a2 2 0 002 2h4a2 2 0 002-2m-6 0h6" />
                          </svg>
                                                <span className="text-slate-600 text-sm">
  {new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(event.date))}
</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span className="text-sm text-slate-600">{event.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                {events.filter((e) => new Date(e.date) >= new Date()).length === 0 && (
                  <div className="text-center py-8">
                    <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-4 rounded-2xl mb-3 inline-block">
                      <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v8m0 0V9a2 2 0 012-2h4a2 2 0 012 2v10m-6 0a2 2 0 002 2h4a2 2 0 002-2m-6 0h6" />
                      </svg>
                    </div>
                    <p className="text-slate-500">لا توجد فعاليات حالياً</p>
                  </div>
                )}
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  );
}