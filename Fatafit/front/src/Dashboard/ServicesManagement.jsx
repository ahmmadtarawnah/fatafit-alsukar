import React from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function ServicesManagement({
  services = [],
  newService = { name: '', category: 'الطبي', image: '', description: '' },
  showAddServiceForm = false,
  setNewService = () => {},
  setShowAddServiceForm = () => {},
  handleAddService = () => {},
  handleDeleteService = () => {},
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  إدارة الخدمات
                </h1>
                <p className="text-slate-600 text-lg">
                  إضافة وإدارة الخدمات المتاحة للمستفيدين
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-teal-200 font-semibold"
                  onClick={() => setShowAddServiceForm(true)}
                >
                  <Plus className="w-5 h-5 ml-2" />
                  <span>إضافة خدمة</span>
                </button>
                <div className="hidden md:flex bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
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
                <p className="text-slate-600 text-sm font-medium">إجمالي الخدمات</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{services.length}</p>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الخدمات الطبية</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">
                  {services.filter(service => service.category === "الطبي").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">التعليم</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {services.filter(service => service.category === "التعليم").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الدعم النفسي</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {services.filter(service => service.category === "الدعم النفسي").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add Service Form */}
        {showAddServiceForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8 animate-in slide-in-from-top duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent">
                إضافة خدمة جديدة
              </h3>
              <button
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all duration-300"
                onClick={() => setShowAddServiceForm(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    اسم الخدمة
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                    placeholder="أدخل اسم الخدمة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    الفئة
                  </label>
                  <select
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newService.category}
                    onChange={(e) =>
                      setNewService({ ...newService, category: e.target.value })
                    }
                  >
                    <option value="الطبي">الطبي</option>
                    <option value="التعليم">التعليم</option>
                    <option value="المستلزمات">المستلزمات</option>
                    <option value="الدعم النفسي">الدعم النفسي</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newService.image}
                    onChange={(e) =>
                      setNewService({ ...newService, image: e.target.value })
                    }
                    placeholder="أدخل رابط الصورة"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                    value={newService.description}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        description: e.target.value,
                      })
                    }
                    placeholder="أدخل وصف الخدمة"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-semibold"
                  onClick={() => setShowAddServiceForm(false)}
                >
                  إلغاء
                </button>
                <button
                  onClick={handleAddService}
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-teal-200 font-semibold"
                >
                  إضافة الخدمة
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">قائمة الخدمات</h3>
            <p className="text-slate-600 mt-1">إدارة وتحديث الخدمات المتاحة للمستفيدين</p>
          </div>

          <div className="p-6">
            {services.length === 0 ? (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-r from-slate-100 to-teal-100 p-6 rounded-2xl mb-4">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد خدمات حالياً</h3>
                  <p className="text-slate-500">ابدأ بإضافة خدمة جديدة باستخدام الزر أعلاه</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div
                    key={service._id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={service.image || "https://via.placeholder.com/400x240?text=صورة+الخدمة"}
                        alt={service.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-600 transition-colors duration-300 mb-2">
                            {service.name}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            service.category === "الطبي" 
                              ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                              : service.category === "التعليم"
                              ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                              : service.category === "الدعم النفسي"
                              ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200"
                              : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                          }`}>
                            {service.category}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-xl transition-all duration-300 hover:scale-110">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            onClick={() => handleDeleteService(service._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {service.description && service.description.length > 100 
                          ? `${service.description.substring(0, 100)}...` 
                          : service.description}
                      </p>
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