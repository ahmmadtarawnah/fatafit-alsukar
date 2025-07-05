import { useState, useEffect } from "react";
import axios from "axios";

export default function SummerClubsManagement() {
  const [clubs, setClubs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    moreInfo: "",
    maxChildren: "",
    costPerChild: "",
    image: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [selectedClubUsers, setSelectedClubUsers] = useState([]);
  const [selectedClubTitle, setSelectedClubTitle] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Fetch all clubs from backend
  const fetchClubs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/summer-clubs");
      setClubs(res.data);
    } catch (err) {
      setError("فشل في جلب النوادي الصيفية");
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('moreInfo', form.moreInfo);
    formData.append('maxChildren', form.maxChildren);
    formData.append('costPerChild', form.costPerChild);
    if (form.image) {
      formData.append('image', form.image);
    }
    try {
      await axios.post("http://localhost:5000/api/summer-clubs", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess("تمت إضافة النادي الصيفي بنجاح");
      setForm({ title: "", moreInfo: "", maxChildren: "", costPerChild: "", image: null });
      fetchClubs();
    } catch (err) {
      setError("حدث خطأ أثناء الإضافة");
    } finally {
      setLoading(false);
    }
  };

  const openUsersModal = async (club) => {
    try {
      // Fetch the club details with registrations
      const response = await axios.get(`http://localhost:5000/api/summer-clubs/${club._id}`);
      setSelectedClubUsers(response.data.registrations || []);
    setSelectedClubTitle(club.title);
    setShowUsersModal(true);
    } catch (err) {
      setError("فشل في جلب بيانات المشتركين");
      console.error("Error fetching club details:", err);
    }
  };

  const closeUsersModal = () => {
    setShowUsersModal(false);
    setSelectedClubUsers([]);
    setSelectedClubTitle("");
  };

  const handleDelete = async (clubId) => {
    try {
      await axios.delete(`http://localhost:5000/api/summer-clubs/${clubId}`);
      setSuccess("تم حذف النادي الصيفي بنجاح");
      fetchClubs();
    } catch (err) {
      setError("حدث خطأ أثناء الحذف");
    }
  };

  const openPopup = (text) => {
    setPopupText(text);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupText("");
  };

  function ReadMoreCell({ text = "-", maxLength = 50 }) {
    if (!text || text === "-") return <span className="text-slate-400 text-sm">-</span>;

    const isLong = text.length > maxLength;
    const displayText = !isLong ? text : text.slice(0, maxLength) + "...";

  return (
      <div className="max-w-xs">
        {isLong ? (
          <div className="bg-slate-50 rounded-lg p-2 text-sm text-slate-600 truncate cursor-pointer" 
               title={text}
               onClick={() => openPopup(text)}>
            {displayText}
          </div>
        ) : (
          <span className="text-slate-600 text-sm">{displayText}</span>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            إدارة النوادي الصيفية
          </h1>
                  <p className="text-slate-600 text-lg">
                    إضافة وإدارة النوادي الصيفية للأطفال
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">إجمالي النوادي</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{clubs.length}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">إجمالي التسجيلات</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">
                    {clubs.reduce((total, club) => total + (club.registrations?.length || 0), 0)}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">متوسط التكلفة</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">
                    {clubs.length > 0
                      ? Math.round(
                          clubs.reduce((total, club) => total + Number(club.costPerChild), 0) / clubs.length
                        )
                      : 0}{" "}
                    د.أ
                  </p>
                </div>
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Club Button */}
          <div className="mb-8 flex justify-end">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center"
            >
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {showForm ? "إغلاق النموذج" : "إضافة نادي جديد"}
            </button>
        </div>

          {/* Form Section */}
          {showForm && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-lg">+</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">إضافة نادي جديد</h2>
              </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                    عنوان النادي
                  </label>
                  <input 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required 
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50 focus:bg-white"
                    placeholder="اكتب عنوان النادي..."
                  />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                    معلومات إضافية
                  </label>
                  <textarea 
                    name="moreInfo" 
                    value={form.moreInfo} 
                    onChange={handleChange} 
                    required 
                    rows="4"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50 focus:bg-white resize-none"
                    placeholder="اكتب معلومات إضافية عن النادي..."
                  />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                    صورة النادي
                  </label>
                  <input 
                    name="image" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleChange} 
                    required 
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                      عدد الأطفال المسموح
                    </label>
                    <input 
                      name="maxChildren" 
                      type="number" 
                      min="1" 
                      value={form.maxChildren} 
                      onChange={handleChange} 
                      required 
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50 focus:bg-white"
                      placeholder="مثال: 20"
                    />
                  </div>

                  <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                      التكلفة للطفل الواحد (بالدينار)
                    </label>
                    <input 
                      name="costPerChild" 
                      type="number" 
                      min="0" 
                      value={form.costPerChild} 
                      onChange={handleChange} 
                      required 
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-slate-50 focus:bg-white"
                      placeholder="مثال: 50"
                    />
                  </div>
                </div>

                <button 
                    type="submit"
                  disabled={loading || !form.title || !form.moreInfo || !form.maxChildren || !form.costPerChild} 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      جاري الإضافة...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-2">🎯</span>
                      إضافة نادي صيفي
                    </div>
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span>
                      <span className="text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">✅</span>
                      <span className="text-green-700 font-medium">{success}</span>
                    </div>
                  </div>
                )}
                </form>
              </div>
            </div>
          )}

          {/* Clubs List Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-800">قائمة النوادي الصيفية</h3>
              <p className="text-slate-600 mt-1">مراجعة وإدارة النوادي الصيفية</p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {clubs.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="flex flex-col items-center justify-center">
                    <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 rounded-2xl mb-4">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد نوادي حالياً</h3>
                    <p className="text-slate-500">ابدأ بإضافة أول نادي صيفي</p>
                  </div>
                  </div>
                ) : (
                clubs.map((club) => (
                  <div
                    key={club._id}
                    className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse mb-4">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {club.title.charAt(0)}
                            </div>
                            <div>
                        <h3 className="font-semibold text-slate-800 text-lg">{club.title}</h3>
                        <p className="text-sm text-slate-600">
                          {club.registrations?.length || 0} / {club.maxChildren} مشترك
                        </p>
                            </div>
                          </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {club.costPerChild} د.أ للطفل الواحد
                            </div>
                      <div className="text-sm text-slate-600 line-clamp-2">
                        {club.moreInfo}
                            </div>
                          </div>

                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => openUsersModal(club)}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 text-sm font-medium flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        المشتركين
                      </button>
                      <button
                        onClick={() => handleDelete(club._id)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                        </div>
                  </div>
                ))
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal for Additional Info */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                المعلومات التفصيلية
              </h3>
              <button
                onClick={closePopup}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="prose prose-sm max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-right">
                  {popupText}
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={closePopup}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Modal */}
      {showUsersModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                مشتركي نادي {selectedClubTitle}
              </h3>
              <button
                onClick={closeUsersModal}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
            {selectedClubUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 rounded-2xl mb-4 inline-block">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">لا يوجد مشتركين حالياً</h3>
                  <p className="text-slate-500">لم يتم تسجيل أي مشترك في هذا النادي بعد</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedClubUsers.map((user) => (
                    <div
                      key={user._id}
                      className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          {user.mobile && (
                            <p className="text-sm text-slate-600 mt-1">
                              <span className="inline-flex items-center">
                                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {user.mobile}
                              </span>
                            </p>
                          )}
                          <p className="text-sm mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.paid 
                                ? "bg-green-100 text-green-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {user.paid ? "تم الدفع" : "لم يتم الدفع"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            </div>
            
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button
                onClick={closeUsersModal}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}