// SuccessStories.jsx
import React, { useState, useEffect } from "react";
import { Star, Heart, User, Calendar, TrendingUp, Award, ChevronLeft, ChevronRight, ArrowRight, X, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 6;
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/success-stories");
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Calculate pagination
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCategoryColor = (age) => {
    if (parseInt(age) < 18) return 'from-blue-500 to-cyan-600';
    if (parseInt(age) < 40) return 'from-teal-500 to-emerald-600';
    return 'from-indigo-500 to-blue-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50" dir="rtl">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
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
              <span className="text-sm font-medium">قصص ملهمة</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
              قصص النجاح الملهمة
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              اكتشف قصص النجاح الملهمة لمستفيدينا الذين تغلبوا على التحديات وحققوا أهدافهم
            </p>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="text-slate-600 mt-4 text-lg">جاري تحميل القصص...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center p-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">لا توجد قصص نجاح حالياً</h3>
            <p className="text-slate-600 text-lg">سنقوم بإضافة قصص النجاح قريباً</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentStories.map((story, index) => (
                <div
                  key={story._id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 hover:bg-white"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Border Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(story.age)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                  <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
                  
                  {/* Content Container */}
                  <div className="relative z-10">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden rounded-t-3xl">
                      <img
                        src={story.image ? `http://localhost:5000${story.image}` : "https://via.placeholder.com/400"}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                      
                      {/* Age Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(story.age)} text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm`}>
                          {parseInt(story.age) < 18 ? "طفل" : parseInt(story.age) < 40 ? "شاب" : "كبير"}
                        </span>
                      </div>
                      
                      {/* Author Info */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">{story.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-300">
                        {story.title}
                      </h3>
                      <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                        {story.story}
                      </p>

                      {/* Details */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-4 text-slate-700">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getCategoryColor(story.age)} opacity-10 flex items-center justify-center`}>
                            <Calendar className="w-5 h-5 text-slate-600" />
                          </div>
                          <span className="font-medium">العمر: {story.age} سنة</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          to={`/success-stories/${story._id}`}
                          className={`flex-1 py-4 px-6 bg-gradient-to-r ${getCategoryColor(story.age)} text-white rounded-2xl transition-all duration-300 hover:shadow-lg text-center font-semibold hover:scale-105 relative overflow-hidden group/btn`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-full transition-all duration-1000 transform -translate-x-full"></div>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            اقرأ المزيد
                            <ArrowRight className="w-4 h-4 rotate-180" />
                          </span>
                        </Link>
                        <button className="w-14 h-14 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-indigo-500 rounded-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center">
                          <Bookmark className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-4 space-x-reverse">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <span className="text-slate-600">
                  الصفحة {currentPage} من {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

   

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
}
