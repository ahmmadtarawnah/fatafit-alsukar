import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, X, Calendar, Users, Tag, Info } from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    category: "توعوية",
    beneficiaries: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/activities");
      setEvents(response.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "فشل في جلب الفعاليات",
      });
    }
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Process beneficiaries
      const payload = {
        ...newEvent,
        beneficiaries: newEvent.beneficiaries
          ? newEvent.beneficiaries.split(",").map((b) => b.trim())
          : [],
      };

      // Determine if we're adding or updating
      if (editMode) {
        await axios.put(`http://localhost:5000/api/activities/${currentEventId}`, payload);
        Swal.fire({
          icon: "success",
          title: "تم التحديث بنجاح",
          text: "تم تحديث الفعالية بنجاح",
        });
      } else {
        await axios.post("http://localhost:5000/api/activities", payload);
        Swal.fire({
          icon: "success",
          title: "تمت الإضافة بنجاح",
          text: "تم إضافة الفعالية بنجاح",
        });
      }

      // Refresh events list and reset form
      fetchEvents();
      resetForm();
    } catch (err) {
      console.error("Error saving event:", err);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "حدث خطأ أثناء حفظ الفعالية",
      });
    }
  };

  // Handle edit event
  const handleEditEvent = (event) => {
    setNewEvent({
      name: event.name,
      description: event.description,
      date: new Date(event.date).toISOString().split('T')[0],
      category: event.category,
      beneficiaries: event.beneficiaries ? event.beneficiaries.join(", ") : "",
      image: event.image || "",
    });
    setCurrentEventId(event._id);
    setEditMode(true);
    setShowForm(true);
  };

  // Handle delete event
  const handleDeleteEvent = async (id) => {
    try {
      const result = await Swal.fire({
        title: "هل أنت متأكد؟",
        text: "لن تتمكن من استعادة هذه الفعالية!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم، احذفها!",
        cancelButtonText: "إلغاء"
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/activities/${id}`);
        fetchEvents();
        Swal.fire("تم الحذف!", "تم حذف الفعالية بنجاح.", "success");
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: "فشل في حذف الفعالية",
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setNewEvent({
      name: "",
      description: "",
      date: "",
      category: "توعوية",
      beneficiaries: "",
      image: "",
    });
    setCurrentEventId(null);
    setEditMode(false);
    setShowForm(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-EG', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  إدارة الفعاليات
                </h1>
                <p className="text-slate-600 text-lg">
                  إضافة وإدارة الفعاليات والأنشطة للمستفيدين
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-2xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-teal-200 font-semibold"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="w-5 h-5 ml-2" />
                  <span>إضافة فعالية</span>
                </button>
                <div className="hidden md:flex bg-gradient-to-r from-teal-500 to-cyan-500 p-4 rounded-2xl shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
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
                <p className="text-slate-600 text-sm font-medium">إجمالي الفعاليات</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{events.length}</p>
              </div>
              <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الفعاليات التوعوية</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">
                  {events.filter(event => event.category === "توعوية").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-3 rounded-xl">
                <Info className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الفعاليات الرياضية</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {events.filter(event => event.category === "رياضية").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">الفعاليات التربوية</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">
                  {events.filter(event => event.category === "تربوية").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Event Form */}
        {showForm && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8 animate-in slide-in-from-top duration-500">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent">
                {editMode ? "تعديل الفعالية" : "إضافة فعالية جديدة"}
              </h3>
              <button
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-all duration-300"
                onClick={resetForm}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    اسم الفعالية
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newEvent.name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, name: e.target.value })
                    }
                    placeholder="أدخل اسم الفعالية"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    التصنيف
                  </label>
                  <select
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newEvent.category}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, category: e.target.value })
                    }
                    required
                  >
                    <option value="توعوية">توعوية</option>
                    <option value="رياضية">رياضية</option>
                    <option value="تربوية">تربوية</option>
                    <option value="اجتماعية">اجتماعية</option>
                    <option value="ثقافية">ثقافية</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    المستفيدون (افصل بينهم بفاصلة)
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newEvent.beneficiaries}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, beneficiaries: e.target.value })
                    }
                    placeholder="مثال: أطفال, شباب, مسنين"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    رابط الصورة
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={newEvent.image}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, image: e.target.value })
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
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        description: e.target.value,
                      })
                    }
                    placeholder="أدخل وصف الفعالية"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-semibold"
                  onClick={resetForm}
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-teal-200 font-semibold"
                >
                  {editMode ? "تحديث الفعالية" : "إضافة الفعالية"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">قائمة الفعاليات</h3>
            <p className="text-slate-600 mt-1">إدارة وتحديث الفعاليات والأنشطة</p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto mb-4"></div>
                <p className="text-slate-600">جاري تحميل الفعاليات...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gradient-to-r from-slate-100 to-teal-100 p-6 rounded-2xl mb-4">
                    <Calendar className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد فعاليات حالياً</h3>
                  <p className="text-slate-500">ابدأ بإضافة فعالية جديدة باستخدام الزر أعلاه</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <div
                    key={event._id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image || "https://via.placeholder.com/400x240?text=صورة+الفعالية"}
                        alt={event.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x240?text=صورة+الفعالية";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                          event.category === "توعوية" 
                            ? "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200"
                            : event.category === "رياضية"
                            ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                            : event.category === "تربوية"
                            ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200"
                            : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                        }`}>
                          {event.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-800 group-hover:text-teal-600 transition-colors duration-300 mb-2">
                            {event.name}
                          </h3>
                          <div className="flex items-center text-sm text-slate-500 mb-2">
                            <Calendar className="w-4 h-4 ml-1" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 space-x-reverse">
                          <button 
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            onClick={() => handleEditEvent(event)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-xl transition-all duration-300 hover:scale-110"
                            onClick={() => handleDeleteEvent(event._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">
                        {event.description && event.description.length > 100 
                          ? `${event.description.substring(0, 100)}...` 
                          : event.description}
                      </p>
                      
                      {event.beneficiaries && event.beneficiaries.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="flex items-center text-sm text-slate-500 mb-2">
                            <Users className="w-4 h-4 ml-1" />
                            <span className="font-medium">المستفيدون:</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {event.beneficiaries.map((beneficiary, idx) => (
                              <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                                {beneficiary}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
};

export default Events;