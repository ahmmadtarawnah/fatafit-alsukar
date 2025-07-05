import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X, Search, Image as ImageIcon, BookOpen, Tag, User, Calendar, Check, Archive, ArchiveRestore } from "lucide-react";

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(null);
  const [archivedArticles, setArchivedArticles] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
    tags: "",
    author: "",
  });

  useEffect(() => {
    fetchArticles();
    fetchArchivedArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/articles");
      setArticles(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching articles", error);
      setError("حدث خطأ أثناء تحميل المقالات");
    } finally {
      setLoading(false);
    }
  };

  const fetchArchivedArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles?archived=true");
      setArchivedArticles(response.data);
    } catch (error) {
      console.error("Error fetching archived articles:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleImageChange = (e) => {
  const file = e.target.files[0];
  
  // التحقق من نوع الملف
  if (file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('الرجاء اختيار صورة بصيغة JPG, JPEG أو PNG فقط');
      e.target.value = ''; // مسح قيمة المدخل
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "image" && !formData[key]) return; // skip if image is null/empty
        formDataToSend.append(key, formData[key]);
      });

      if (selectedArticle) {
        await axios.put(`http://localhost:5000/api/articles/${selectedArticle._id}`, formDataToSend);
      } else {
        await axios.post("http://localhost:5000/api/articles", formDataToSend);
      }

      setIsModalOpen(false);
      setSelectedArticle(null);
      setFormData({
        title: "",
        content: "",
        category: "",
        image: null,
        tags: "",
        author: "",
      });
      fetchArticles();
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Backend error:", error.response.data);
        setError(error.response.data.message || "حدث خطأ أثناء حفظ المقال");
      } else {
        console.error("Error saving article", error);
        setError("حدث خطأ أثناء حفظ المقال");
      }
    }
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      image: null,
      tags: article.tags?.join(", ") || "",
      author: article.author,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المقال؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        fetchArticles();
      } catch (error) {
        console.error("Error deleting article", error);
        setError("حدث خطأ أثناء حذف المقال");
      }
    }
  };

  const handleArchive = async (article) => {
    if (window.confirm("هل أنت متأكد من أرشفة هذا المقال؟")) {
      try {
        await axios.post(`http://localhost:5000/api/articles/${article._id}/archive`);
        fetchArticles();
        fetchArchivedArticles();
      } catch (error) {
        console.error("Error archiving article:", error);
        setError("حدث خطأ أثناء أرشفة المقال");
      }
    }
  };

  const handleUnarchive = async (article) => {
    if (window.confirm("هل أنت متأكد من إعادة نشر هذا المقال؟")) {
      try {
        await axios.post(`http://localhost:5000/api/articles/${article._id}/unarchive`);
        fetchArticles();
        fetchArchivedArticles();
      } catch (error) {
        console.error("Error unarchiving article:", error);
        setError("حدث خطأ أثناء إعادة نشر المقال");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  إدارة المقالات
                </h1>
                <p className="text-slate-600 text-lg">
                  إضافة وإدارة المقالات والمنشورات على المنصة
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setFormData({
                      title: "",
                      content: "",
                      category: "",
                      image: null,
                      tags: "",
                      author: "",
                    });
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-200 font-semibold"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  <span>إضافة مقال جديد</span>
                </button>
                <div className="hidden md:flex bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">إجمالي المقالات</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{articles.length}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">مقالات الصحة</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">
                  {articles.filter(article => article.category === "الصحة").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">مقالات التغذية</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">
                  {articles.filter(article => article.category === "التغذية").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">مقالات التمارين</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {articles.filter(article => article.category === "التمارين").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>   


          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">قصص نجاح</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {articles.filter(article => article.category === "قصص نجاح").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-500 p-3 rounded-xl">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">المقالات المؤرشفة</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">
                  {archivedArticles.length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-3 rounded-xl">
                <Archive className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
                    {selectedArticle ? "تعديل المقال" : "إضافة مقال جديد"}
                  </h2>
                  <button
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all duration-300"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">عنوان المقال</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        required
                        placeholder="أدخل عنوان المقال"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">الفئة</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        required
                      >
                        <option value="">اختر الفئة</option>
                        <option value="الصحة">الصحة</option>
                        <option value="التغذية">التغذية</option>
                        <option value="التمارين">التمارين</option>
                        <option value="قصص نجاح">قصص نجاح</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">المؤلف</label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        required
                        placeholder="أدخل اسم المؤلف"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">الوسوم (مفصولة بفواصل)</label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="مثال: صحة، تغذية، تمارين"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">صورة المقال</label>
                      <div className="mt-1 flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors duration-300">
                          <ImageIcon className="w-5 h-5" />
                          <span>اختر صورة</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {formData.image && (
                          <span className="text-sm text-slate-600">
                            {formData.image.name}
                          </span>
                        )}
                      </div>
                       {imageError && (
    <p className="mt-2 text-sm text-red-600">{imageError}</p>
  )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">محتوى المقال</label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows="8"
                        className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                        required
                        placeholder="أدخل محتوى المقال..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                    <button
                      type="button"
                      className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-semibold"
                      onClick={() => setIsModalOpen(false)}
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blue-200 font-semibold"
                    >
                      {selectedArticle ? "حفظ التغييرات" : "إضافة المقال"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-800">قائمة المقالات</h3>
                <p className="text-slate-600 mt-1">إدارة وتحديث المقالات المنشورة على المنصة</p>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="border-2 border-slate-200 rounded-xl pl-4 pr-10 py-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  placeholder="بحث..."
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="py-16 text-center">
                <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-2xl inline-block mb-4">
                  <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-600 mb-2">حدث خطأ أثناء تحميل المقالات</h3>
                <p className="text-slate-500">{error}</p>
                <button
                  onClick={fetchArticles}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : articles.length === 0 ? (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 rounded-2xl mb-4">
                    <BookOpen className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد مقالات حالياً</h3>
                  <p className="text-slate-500">ابدأ بإضافة مقال جديد باستخدام الزر أعلاه</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <div
                    key={article._id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/400x240?text=صورة+المقال"}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex flex-wrap gap-2">
                          {article.tags?.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/90 text-xs text-slate-800 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            article.category === "الصحة" 
                              ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                              : article.category === "التغذية"
                              ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                              : article.category === "التمارين"
                              ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                          }`}>
                            {article.category}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2 space-x-reverse">
                          <button 
                            onClick={() => handleEdit(article)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleArchive(article)}
                            className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            title="أرشفة المقال"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(article._id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.date).toLocaleDateString("ar-EG")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Archived Articles Section */}
        {archivedArticles.length > 0 && (
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">المقالات المؤرشفة</h3>
                  <p className="text-slate-600 mt-1">المقالات التي تم أرشفتها</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archivedArticles.map((article) => (
                  <div
                    key={article._id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group opacity-75"
                  >
                    <div className="relative">
                      <img
                        src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/400x240?text=صورة+المقال"}
                        alt={article.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                          مؤرشف
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            article.category === "الصحة" 
                              ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                              : article.category === "التغذية"
                              ? "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                              : article.category === "التمارين"
                              ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                          }`}>
                            {article.category}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleUnarchive(article)}
                            className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            title="إعادة نشر المقال"
                          >
                            <ArchiveRestore className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(article._id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                        {article.content}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <User className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.date).toLocaleDateString("ar-EG")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesManagement;