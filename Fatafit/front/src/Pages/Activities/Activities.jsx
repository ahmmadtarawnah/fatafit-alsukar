import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, Clock, Tag, ChevronLeft, ArrowRight, Search, Filter, Star, Users, Heart, Share2, X } from "lucide-react";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);

  // جلب البيانات من الـ Backend
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/activities"
        );
        setActivities(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching activities", error);
        setError("حدث خطأ أثناء تحميل الفعاليات، يرجى المحاولة مرة أخرى");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // استخراج جميع الفئات الفريدة
  const categories =
    activities.length > 0
      ? ["all", ...new Set(activities.map((activity) => activity.category))]
      : ["all"];

  // فلترة الفعاليات حسب الفئة المختارة
  const filteredActivities =
    activities
      .filter((activity) => selectedCategory === "all" || activity.category === selectedCategory)
      .filter((activity) => 
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // تنسيق التاريخ باللغة العربية
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ar-GB", options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'تكنولوجيا': 'from-purple-500 to-indigo-600',
      'فنون': 'from-pink-500 to-rose-600',
      'أعمال': 'from-emerald-500 to-teal-600',
      'طعام': 'from-orange-500 to-red-600',
      'default': 'from-blue-500 to-cyan-600'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 font-sans" dir="rtl">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-2 h-2 bg-white/40 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400 ml-2" />
              <span className="text-sm font-medium">أفضل الفعاليات المميزة</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
              الفعاليات القادمة
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              اكتشف عالماً من التجارب الاستثنائية والفعاليات المتميزة التي تلهمك وتثري معرفتك
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-1">
                  <input
                    type="text"
                    placeholder="ابحث عن فعالية تلهمك..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-8 py-5 bg-transparent text-white placeholder-white/60 focus:outline-none text-lg"
                  />
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:text-white transition-colors duration-300">
                    <Search className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Category Filter */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">اختر الفئة المناسبة لك</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 overflow-hidden group ${
                  selectedCategory === category
                    ? "text-white shadow-xl scale-105"
                    : "text-slate-700 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                {selectedCategory === category && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(category)}`}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>
                <span className="relative z-10">
                  {category === "all" ? "جميع الفعاليات" : category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="text-slate-600 mt-4 text-lg">جاري تحميل الفعاليات المميزة...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 p-8 rounded-2xl text-center mb-8 shadow-lg">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-lg">{error}</p>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && filteredActivities.length === 0 && (
          <div className="text-center p-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">لم نعثر على نتائج</h3>
            <p className="text-slate-600 text-lg">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
          </div>
        )}

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredActivities.map((activity, index) => (
            <div
              key={activity._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 hover:bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(activity.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
              
              {/* Content Container */}
              <div className="relative z-10">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={activity.image || "https://via.placeholder.com/400"}
                    alt={activity.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(activity.category)} text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm`}>
                      {activity.category}
                    </span>
                  </div>
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">{activity.attendees || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">{activity.rating || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {activity.name}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {activity.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-slate-700">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getCategoryColor(activity.category)} opacity-10 flex items-center justify-center`}>
                        <Calendar className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="font-medium">{formatDate(activity.date)}</span>
                    </div>
                    {activity.location && (
                      <div className="flex items-center gap-4 text-slate-700">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getCategoryColor(activity.category)} opacity-10 flex items-center justify-center`}>
                          <MapPin className="w-5 h-5 text-slate-600" />
                        </div>
                        <span className="font-medium">{activity.location}</span>
                      </div>
                    )}
                    {activity.time && (
                      <div className="flex items-center gap-4 text-slate-700">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getCategoryColor(activity.category)} opacity-10 flex items-center justify-center`}>
                          <Clock className="w-5 h-5 text-slate-600" />
                        </div>
                        <span className="font-medium">{activity.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedActivity(activity)}
                      className={`flex-1 py-4 px-6 bg-gradient-to-r ${getCategoryColor(activity.category)} text-white rounded-2xl transition-all duration-300 hover:shadow-lg text-center font-semibold hover:scale-105 relative overflow-hidden group/btn`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        عرض التفاصيل
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </span>
                    </button>
                    <button className="w-14 h-14 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-red-500 rounded-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-in fade-in duration-300">
            <button
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all duration-300"
              onClick={() => setSelectedActivity(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={selectedActivity.image || "https://via.placeholder.com/400"}
                alt={selectedActivity.name}
                className="w-full md:w-64 h-64 object-cover rounded-xl mb-4 md:mb-0"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{selectedActivity.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(selectedActivity.category)} text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm`}>
                    {selectedActivity.category}
                  </span>
                  {selectedActivity.date && (
                    <span className="flex items-center gap-1 text-slate-600 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedActivity.date)}
                    </span>
                  )}
                  {selectedActivity.location && (
                    <span className="flex items-center gap-1 text-slate-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      {selectedActivity.location}
                    </span>
                  )}
                  {selectedActivity.time && (
                    <span className="flex items-center gap-1 text-slate-600 text-sm">
                      <Clock className="w-4 h-4" />
                      {selectedActivity.time}
                    </span>
                  )}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">{selectedActivity.description}</p>
                <div className="flex gap-4 mb-2">
                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                    <Users className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium">{selectedActivity.attendees || 0} مشارك</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">{selectedActivity.rating || 0} تقييم</span>
                  </div>
                </div>
                {selectedActivity.tags && selectedActivity.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedActivity.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .bg-grid-white\/\[0\.02\] {
          background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.02) 1px, transparent 0);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Activities;
