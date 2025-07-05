import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Star, Search } from "lucide-react";

export default function SummerClubPage() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", mobile: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [registering, setRegistering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/summer-clubs")
      .then(res => setClubs(res.data))
      .catch(() => setError("فشل في جلب النوادي الصيفية"))
      .finally(() => setLoading(false));
  };

  const openModal = (club) => {
    setSelectedClub(club);
    setForm({ name: "", email: "", mobile: "" });
    setFormError("");
    setFormSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClub(null);
    setFormError("");
    setFormSuccess("");
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegistering(true);
    setFormError("");
    setFormSuccess("");
    try {
      const res = await axios.post(`http://localhost:5000/api/summer-clubs/${selectedClub._id}/register`, form);
      // Store registration data in localStorage for payment page
      localStorage.setItem('pendingPayment', JSON.stringify({
        clubId: selectedClub._id,
        clubTitle: selectedClub.title,
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        amount: selectedClub.costPerChild,
        registrationId: res.data.registrationId // Make sure backend returns this
      }));
      // Redirect to payment page
      navigate('/payment');
    } catch (err) {
      setFormError(err.response?.data?.message || "حدث خطأ أثناء التسجيل");
    } finally {
      setRegistering(false);
    }
  };

  // Only show clubs with available spots
  const availableClubs = clubs.filter(club => (club.maxChildren - (club.registrations?.length || 0)) > 0);

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
              <span className="text-sm font-medium">أفضل النوادي الصيفية المميزة</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
              النوادي الصيفية
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
                    placeholder="ابحث عن نادي صيفي..."
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
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="text-slate-600 mt-4 text-lg">جاري تحميل النوادي الصيفية المميزة...</p>
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
        {!loading && !error && availableClubs.length === 0 && (
          <div className="text-center p-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
            <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">لم نعثر على نتائج</h3>
            <p className="text-slate-600 text-lg">جرب البحث بكلمات مختلفة</p>
          </div>
        )}

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {availableClubs.map((club, idx) => {
            const spotsLeft = club.maxChildren - (club.registrations?.length || 0);
            return (
              <div key={idx} className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 hover:bg-white">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
                
                {/* Content Container */}
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-blue-700 mb-2">{club.title}</h2>
                  {club.image && (
                    <img src={`http://localhost:5000/uploads/summer-clubs/${club.image}`} alt={club.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                  )}
                  <div className="text-gray-700 mb-2">{club.moreInfo}</div>
                  <div className="flex flex-wrap gap-4 text-sm mb-2">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">عدد الأطفال المتبقي: {spotsLeft}</span>
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">التكلفة للطفل: {club.costPerChild} د.أ</span>
                  </div>
                  {spotsLeft > 0 && (
                    <button
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => openModal(club)}
                    >
                      سجل الآن
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && selectedClub && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.4)'}}>
          <div className="bg-white/90 rounded-3xl shadow-2xl p-10 w-full max-w-md relative border border-blue-100">
            <button className="absolute top-4 left-4 text-gray-400 hover:text-blue-600 text-3xl font-bold transition" onClick={closeModal}>&times;</button>
            <h2 className="text-2xl font-extrabold text-blue-700 mb-6 text-center tracking-tight">التسجيل في {selectedClub.title}</h2>
            <form onSubmit={handleRegister} className="space-y-5 bg-blue-50/30 rounded-xl p-4">
              <div>
                <label className="block mb-1 font-semibold text-blue-900">الاسم</label>
                <input name="name" value={form.name} onChange={handleFormChange} required className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-900">البريد الإلكتروني</label>
                <input name="email" type="email" value={form.email} onChange={handleFormChange} required className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-900">رقم الهاتف</label>
                <input name="mobile" type="tel" value={form.mobile} onChange={handleFormChange} required className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition" />
              </div>
              <button type="submit" disabled={registering} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full font-bold text-lg shadow-md">
                {registering ? "جاري التسجيل..." : "تأكيد التسجيل والدفع"}
              </button>
              {formError && <div className="text-red-600 mt-2 text-center font-semibold">{formError}</div>}
              {formSuccess && <div className="text-green-600 mt-2 text-center font-semibold">{formSuccess}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 