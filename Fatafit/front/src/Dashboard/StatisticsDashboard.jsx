import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { UserPlus, Heart, ThumbsUp, Users, TrendingUp, Gift } from "lucide-react";
const StatCard = ({ icon, title, value, iconColor, gradient }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 group-hover:scale-105 transition-transform duration-300">
          {value}
        </h3>
      </div>
       <div className={`bg-gradient-to-r ${gradient} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
        <div className={`${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

export default function StatisticsDashboard({
  membershipCount = 0,
  patientRequestCount = 0,
  volunteerRequestCount = 0,
  userCount = 0,
  totalDonations = 0,
  monthlyRegistrations = [
    { name: "يناير", patients: 65, volunteers: 28, memberships: 15, users: 45 },
    { name: "فبراير", patients: 59, volunteers: 48, memberships: 22, users: 52 },
    { name: "مارس", patients: 80, volunteers: 40, memberships: 18, users: 68 },
    { name: "أبريل", patients: 81, volunteers: 19, memberships: 25, users: 71 },
    { name: "مايو", patients: 56, volunteers: 96, memberships: 30, users: 89 }
  ],
  colors = {
    softPink: "#FF8BB0",
    lightYellow: "#FFF9C4", 
    mintGreen: "#A8E6CF",
    lavender: "#E6E6FA"
  },
}) {
  const totalRequests = membershipCount + patientRequestCount + volunteerRequestCount;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  لوحة الإحصائيات
                </h1>
                <p className="text-slate-600 text-lg">
                  مراقبة وتحليل أداء المنصة والخدمات
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8"> 
          <StatCard
            icon={<UserPlus className="w-6 h-6 text-white" />}
            title="طلبات الانتساب"
            value={membershipCount}
            gradient="bg-gradient-to-r from-teal-500 to-cyan-500"
          />
          <StatCard
            icon={<Heart className="w-6 h-6 text-white" />}
            title="طلبات المستفيدين"
            value={patientRequestCount}
            gradient="bg-gradient-to-r from-pink-500 to-rose-500"
          />
          <StatCard
            icon={<ThumbsUp className="w-6 h-6 text-white" />}
            title="طلبات التطوع"
            value={volunteerRequestCount}
            gradient="bg-gradient-to-r from-amber-500 to-orange-500"
          />
          <StatCard
            icon={<Users className="w-6 h-6 text-white" />}
            title="المستفيدين النشطون"
            value={userCount}
            gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
          />
              <StatCard
                      icon={<Gift className="w-6 h-6" />}
                      title="إجمالي التبرعات"
                      value={totalDonations}
                      gradient="from-cyan-500 to-blue-500"
                      iconColor="text-white"
                    />
        </div>

        {/* Summary Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">إجمالي الطلبات</h3>
              <p className="text-slate-600">مجموع جميع الطلبات المقدمة</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {totalRequests}
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">نشط</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-2">تحليل البيانات الشهرية</h3>
            <p className="text-slate-600">
              إحصائيات التسجيل للمستفيدين والمتطوعين خلال الأشهر الخمسة الماضية
            </p>
          </div>

          <div className="p-6">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRegistrations}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                  />
                  <Bar
                    dataKey="patients"
                    name="المستفيدين"
                    fill="url(#pinkGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="volunteers"
                    name="المتطوعين"
                    fill="url(#orangeGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="memberships"
                    name="طلبات الانتساب"
                    fill="url(#tealGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="users"
                    name="المستفيدين النشطون"
                    fill="url(#purpleGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">معدل النمو</h4>
                <p className="text-sm text-slate-600">الشهر الحالي</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">+24%</div>
            <p className="text-sm text-slate-500 mt-1">مقارنة بالشهر الماضي</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">متوسط الاستخدام</h4>
                <p className="text-sm text-slate-600">يومياً</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-sm text-slate-500 mt-1">مستخدم نشط</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">رضا المستخدمين</h4>
                <p className="text-sm text-slate-600">التقييم العام</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">4.8/5</div>
            <p className="text-sm text-slate-500 mt-1">من 245 تقييم</p>
          </div>
        </div>
      </div>
    </div>
  );
}