import React, { useState } from "react";
import { Plus, User, Calendar, Star, X, Heart, Award, TrendingUp, Trash2 } from "lucide-react";
import axios from "axios";

export default function SuccessStoriesManagement({
  successStories = [],
  showForm: externalShowForm,
  formData: externalFormData,
  setFormData: externalSetFormData,
  setShowForm: externalSetShowForm,
  onSubmit = () => {},
  onDelete = () => {}
}) {
  // Internal state for form when external state is not provided
  const [internalShowForm, setInternalShowForm] = useState(false);
  const [internalFormData, setInternalFormData] = useState({ 
    title: '', 
    name: '', 
    age: '', 
    story: '',
    image: null 
  });
  
  // Use external state if provided, otherwise use internal state
  const showForm = externalShowForm !== undefined ? externalShowForm : internalShowForm;
  const formData = externalFormData || internalFormData;
  const setFormData = externalSetFormData || setInternalFormData;
  const setShowForm = externalSetShowForm || setInternalShowForm;

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه القصة؟')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/success-stories/${id}`);
        if (response.status === 200) {
          onDelete(id);
        }
      } catch (error) {
        console.error('فشل في حذف القصة:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data.error || 'حدث خطأ أثناء حذف القصة');
        } else if (error.request) {
          // The request was made but no response was received
          alert('لم يتم استلام رد من الخادم. يرجى التحقق من اتصال الإنترنت');
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('حدث خطأ أثناء إرسال الطلب');
        }
      }
    }
  };
  
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('story', formData.story);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    
    onSubmit(formDataToSend);
    setFormData({ title: '', name: '', age: '', story: '', image: null });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-rose-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  إدارة قصص النجاح
                </h1>
                <p className="text-slate-600 text-lg">
                  مشاركة قصص النجاح الملهمة من المستفيدين
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl hover:from-rose-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-rose-200 font-semibold"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-5 h-5 ml-2" />
                  <span>إضافة قصة نجاح</span>
                </button>
                <div className="hidden md:flex bg-gradient-to-r from-rose-500 to-orange-500 p-4 rounded-2xl shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">إجمالي القصص</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{successStories.length}</p>
              </div>
              <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-3 rounded-xl">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الأطفال</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {successStories.filter(story => parseInt(story.age) < 18).length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الشباب</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">
                  {successStories.filter(story => {
                    const age = parseInt(story.age);
                    return age >= 18 && age < 40;
                  }).length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الكبار</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {successStories.filter(story => parseInt(story.age) >= 40).length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Story Form */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8 animate-in slide-in-from-top duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-rose-600 bg-clip-text text-transparent">
                إضافة قصة نجاح جديدة
              </h3>
              <button
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all duration-300"
                onClick={() => setShowForm(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    عنوان القصة
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="أدخل عنوان القصة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    اسم المستفيد
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="أدخل اسم المستفيد"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    العمر
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="1"
                    max="120"
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="أدخل العمر"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    قصة النجاح
                  </label>
                  <textarea
                    name="story"
                    required
                    rows={6}
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                    value={formData.story}
                    onChange={handleChange}
                    placeholder="شارك قصة النجاح الملهمة..."
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    صورة القصة
                  </label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    onChange={handleChange}
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-semibold"
                  onClick={() => setShowForm(false)}
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl hover:from-rose-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-rose-200 font-semibold"
                >
                  حفظ القصة
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">قصص النجاح</h3>
            <p className="text-slate-600 mt-1">مجموعة من القصص الملهمة للمستفيدين من خدماتنا</p>
          </div>

          <div className="p-6">
            {successStories.length === 0 ? (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-r from-slate-100 to-rose-100 p-6 rounded-2xl mb-4">
                    <Star className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد قصص نجاح حالياً</h3>
                  <p className="text-slate-500">ابدأ بإضافة قصة نجاح ملهمة باستخدام الزر أعلاه</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <div
                    key={story._id || index}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative p-6 bg-gradient-to-br from-rose-50 to-orange-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-3 rounded-full">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-800 group-hover:text-rose-600 transition-colors duration-300">
                              {story.name}
                            </h3>
                            <div className="flex items-center text-slate-600 text-sm">
                              <Calendar className="w-4 h-4 ml-1" />
                              <span>العمر: {story.age} سنة</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleDelete(story._id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                          <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-2 rounded-full">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Heart className="w-5 h-5 text-rose-500 ml-2" />
                        <span className="text-sm font-semibold text-rose-600">قصة النجاح</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-slate-800 mb-2">{story.title}</h4>
                      
                      <p className="text-slate-700 leading-relaxed text-sm">
                        {story.story && story.story.length > 150 
                          ? `${story.story.substring(0, 150)}...` 
                          : story.story}
                      </p>
                      
                      {story.story && story.story.length > 150 && (
                        <button className="text-rose-600 hover:text-rose-800 text-sm font-medium mt-2 hover:underline transition-colors duration-300">
                          اقرأ المزيد
                        </button>
                      )}
                    </div>
                    
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          parseInt(story.age) < 18 
                            ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                            : parseInt(story.age) < 40
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                            : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200"
                        }`}>
                          {parseInt(story.age) < 18 ? "طفل" : parseInt(story.age) < 40 ? "شاب" : "كبير"}
                        </span>
                        
                        <div className="flex items-center text-slate-500 text-xs">
                          <Star className="w-3 h-3 ml-1 text-amber-400" />
                          <span>قصة ملهمة</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}