import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, User, Tag, ArrowRight, ChevronLeft, Bookmark, Share2, Heart, MessageCircle, Send } from "lucide-react";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

const ArchivedArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(response.data);
        setLikesCount(response.data.likes?.length || 0);
        setComments(response.data.comments || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching archived article", error);
        setError("حدث خطأ أثناء تحميل المقال المؤرشف، يرجى المحاولة مرة أخرى");
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndComments();
  }, [id]);

  const handleLike = async () => {
    try {
      // Check if user is logged in
      const userResponse = await axios.get('http://localhost:5000/api/users/me');
      if (!userResponse.data.user) {
        navigate('/login', { state: { from: `/archive/${id}` } });
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/articles/${id}/like`);
      setLikesCount(response.data.likes);
      setIsLiked(response.data.liked);
    } catch (err) {
      console.error('Error liking article:', err);
      if (err.response?.status === 401) {
        navigate('/login', { state: { from: `/archive/${id}` } });
      } else {
        alert('حدث خطأ أثناء الإعجاب بالمقال. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      // Check if user is logged in
      const userResponse = await axios.get('http://localhost:5000/api/users/me');
      if (!userResponse.data.user) {
        navigate('/login', { state: { from: `/archive/${id}` } });
        return;
      }

      const response = await axios.post(`http://localhost:5000/api/articles/${id}/comments`, { text: newCommentText });
      setComments(prevComments => [...prevComments, response.data]);
      setNewCommentText("");
    } catch (err) {
      console.error('Error adding comment:', err);
      if (err.response?.status === 401) {
        navigate('/login', { state: { from: `/archive/${id}` } });
      } else {
        alert('حدث خطأ أثناء إضافة التعليق. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ar-SA", options);
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 text-red-700 p-8 rounded-2xl text-center shadow-lg max-w-lg">
          <div className="text-2xl mb-2">⚠️</div>
          <p className="text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate("/archive")}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
          >
            العودة إلى الأرشيف
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 font-sans" dir="rtl">
      {/* Back Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => navigate("/archive")}
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>العودة</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={article.image ? `http://localhost:5000${article.image}` : "https://via.placeholder.com/1920x1080"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <div className="max-w-3xl">
              <span className={`inline-block px-4 py-2 bg-gradient-to-r ${getCategoryColor(article.category)} text-white rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm mb-4`}>
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(article.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Article Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            {article.content}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">الوسوم</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-300 ${
                  isLiked ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likesCount}</span>
              </button>
            </div>
            
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">التعليقات ({comments.length})</h3>
          
          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 space-y-4">
            <div>
              <label htmlFor="newComment" className="sr-only">أضف تعليقاً</label>
              <textarea
                id="newComment"
                rows="3"
                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
                placeholder="أضف تعليقاً..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
              >
                <Send className="w-5 h-5 ml-2" />
                <span>إرسال التعليق</span>
              </button>
            </div>
          </form>

          {/* Display Comments */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-gray-600 text-center">لا توجد تعليقات حتى الآن.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-800">{comment.user?.fullName || 'مستخدم غير معروف'}</span>
                    <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivedArticleDetails; 