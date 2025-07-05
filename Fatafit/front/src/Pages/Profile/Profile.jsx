import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, BookOpen, User, Calendar, Edit2, Bookmark, MessageCircle, Archive } from "lucide-react";
import { Link } from "react-router-dom";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export default function Profile() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [likedArticles, setLikedArticles] = useState([]);
  const [likedStories, setLikedStories] = useState([]);
  const [archivedArticles, setArchivedArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("profile"); // profile, articles, stories, archive

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const [userRes, articlesRes, storiesRes, archiveRes] = await Promise.all([
          axios.get("http://localhost:5000/api/users/me"),
          axios.get("http://localhost:5000/api/articles"),
          axios.get("http://localhost:5000/api/success-stories"),
          axios.get("http://localhost:5000/api/articles?archived=true")
        ]);

        setForm({ 
          fullName: userRes.data.user.fullName, 
          email: userRes.data.user.email, 
          password: "" 
        });

        // Filter liked articles and stories
        const likedArticles = articlesRes.data.filter(article => 
          article.likes?.includes(userRes.data.user._id)
        );
        const likedStories = storiesRes.data.filter(story => 
          story.likes?.includes(userRes.data.user._id)
        );

        setLikedArticles(likedArticles);
        setLikedStories(likedStories);
        setArchivedArticles(archiveRes.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const payload = { fullName: form.fullName, email: form.email };
      if (form.password) payload.password = form.password;
      const res = await axios.put("http://localhost:5000/api/users/me", payload);
      if (res.ok) {
        setMessage("تم تحديث الملف الشخصي بنجاح");
        setForm(f => ({ ...f, password: "" }));
      } else {
        setError("حدث خطأ أثناء التحديث");
      }
    } catch {
      setError("حدث خطأ أثناء التحديث");
    }
    setSaving(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-200 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold">
                {form.fullName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{form.fullName}</h1>
              <p className="text-gray-600">{form.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              الملف الشخصي
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "articles"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              المقالات المفضلة ({likedArticles.length})
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "stories"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              قصص النجاح المفضلة ({likedStories.length})
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "archive"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              المقالات المؤرشفة ({archivedArticles.length})
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-right text-gray-700 font-medium text-lg">الاسم الكامل</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition"
                  placeholder="الاسم الكامل"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-right text-gray-700 font-medium text-lg">البريد الإلكتروني</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition bg-gray-100 cursor-not-allowed"
                  placeholder="البريد الإلكتروني"
                  required
                  readOnly
                />
              </div>
              <div>
                <label className="block mb-2 text-right text-gray-700 font-medium text-lg">كلمة المرور الجديدة (اختياري)</label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg transition"
                  placeholder="كلمة المرور الجديدة"
                  autoComplete="new-password"
                />
                <span className="text-xs text-gray-400">اترك الحقل فارغًا إذا لا تريد تغيير كلمة المرور</span>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition disabled:opacity-60"
                disabled={saving}
              >
                {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
              </button>
            </form>
          )}

          {/* Liked Articles Tab */}
          {activeTab === "articles" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedArticles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد مقالات مفضلة</h3>
                  <p className="text-gray-500">ابدأ بإضافة مقالاتك المفضلة من صفحة المقالات</p>
                </div>
              ) : (
                likedArticles.map((article) => (
                  <Link
                    key={article._id}
                    to={`/articles/${article._id}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-48">
                      <img
                        src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/400"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">{article.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-500 fill-current" />
                          <span>{article.likes?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Liked Stories Tab */}
          {activeTab === "stories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {likedStories.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد قصص نجاح مفضلة</h3>
                  <p className="text-gray-500">ابدأ بإضافة قصص النجاح المفضلة من صفحة قصص النجاح</p>
                </div>
              ) : (
                likedStories.map((story) => (
                  <Link
                    key={story._id}
                    to={`/success-stories/${story._id}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-48">
                      <img
                        src={story.image ? `http://localhost:5000${story.image}` : "https://via.placeholder.com/400"}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">{story.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(story.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-500 fill-current" />
                          <span>{story.likes?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Archived Articles Tab */}
          {activeTab === "archive" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archivedArticles.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Archive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد مقالات مؤرشفة</h3>
                  <p className="text-gray-500">يمكنك الوصول إلى المقالات المؤرشفة من صفحة الأرشيف</p>
                </div>
              ) : (
                archivedArticles.map((article) => (
                  <Link
                    key={article._id}
                    to={`/archive/${article._id}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative h-48">
                      <img
                        src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/400"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2 mb-4">{article.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-500 fill-current" />
                          <span>{article.likes?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </div>

        {/* Messages */}
        {message && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96">
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg">
              {message}
            </div>
          </div>
        )}
        {error && (
          <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 