import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Filter, Calendar, Tag, User, BookOpen, ChevronLeft, Heart, MessageCircle, ArrowRight, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export default function Archive() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/articles?archived=true");
      setArticles(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching archived articles:", error);
      setError("حدث خطأ أثناء تحميل المقالات المؤرشفة");
    } finally {
      setLoading(false);
    }
  };

  // Get unique years from articles
  const years = [...new Set(articles.map(article => new Date(article.date).getFullYear()))].sort((a, b) => b - a);

  // Get unique categories
  const categories = articles.length > 0
    ? ["all", ...new Set(articles.map((article) => article.category))]
    : ["all"];

  // Filter articles based on search term, category, and year
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesYear = !selectedYear || new Date(article.date).getFullYear().toString() === selectedYear;
    return matchesSearch && matchesCategory && matchesYear;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'نصائح صحية': 'from-emerald-500 to-teal-600',
      'قصص نجاح': 'from-purple-500 to-indigo-600',
      'تغذية': 'from-orange-500 to-red-600',
      'تمارين': 'from-blue-500 to-cyan-600',
      'default': 'from-indigo-500 to-blue-600'
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 font-sans" dir="rtl">
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
              <Bookmark className="w-4 h-4 text-yellow-400 ml-2" />
              <span className="text-sm font-medium">أرشيف المقالات</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
              أرشيف المقالات
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              تصفح المقالات المؤرشفة حسب الفئة والتاريخ والبحث
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-1">
                  <input
                    type="text"
                    placeholder="ابحث في المقالات المؤرشفة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  {category === "all" ? "جميع المقالات" : category}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none bg-white/50"
            >
              <option value="">جميع السنوات</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="text-slate-600 mt-4 text-lg">جاري تحميل المقالات...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 p-8 rounded-2xl text-center mb-8 shadow-lg">
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-lg">{error}</p>
            <button
              onClick={fetchArticles}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && filteredArticles.length === 0 && (
          <div className="text-center p-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">لم نعثر على نتائج</h3>
            <p className="text-slate-600 text-lg">جرب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <div
              key={article._id}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 hover:bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(article.category)} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
              
              {/* Content Container */}
              <div className="relative z-10">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/400"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-2 bg-gradient-to-r ${getCategoryColor(article.category)} text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm`}>
                      {article.category}
                    </span>
                  </div>
                  
                  {/* Author Info */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">{article.author}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-blue-600 transition-all duration-300">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {article.content}
                  </p>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 text-slate-700">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getCategoryColor(article.category)} opacity-10 flex items-center justify-center`}>
                        <Calendar className="w-5 h-5 text-slate-600" />
                      </div>
                      <span className="font-medium">{formatDate(article.date)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/archive/${article._id}`}
                      className={`flex-1 py-4 px-6 bg-gradient-to-r ${getCategoryColor(article.category)} text-white rounded-2xl transition-all duration-300 hover:shadow-lg text-center font-semibold hover:scale-105 relative overflow-hidden group/btn`}
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