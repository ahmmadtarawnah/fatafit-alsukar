import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, User, Calendar, ArrowRight, Heart, Send } from "lucide-react";
import axios from "axios";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export default function SuccessStoryDetails() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchStoryAndComments = async () => {
      try {
        setLoading(true);
        const storyResponse = await axios.get(`http://localhost:5000/api/success-stories/${id}`);

        if (storyResponse.status === 404) {
          setError('404');
          setStory(null);
          setLoading(false);
          return;
        }

        setStory(storyResponse.data);
        setLikesCount(storyResponse.data.likes.length);
        setComments(storyResponse.data.comments);

        setError(null);
      } catch (err) {
        console.error("Error fetching story or comments:", err);
        if (err.response && err.response.status === 404) {
          setError('404');
        } else {
          setError("حدث خطأ أثناء جلب القصة أو التعليقات");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStoryAndComments();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/success-stories/${id}/like`);
      setLikesCount(response.data.likes);
      setIsLiked(response.data.liked);
    } catch (err) {
      console.error('Error liking story:', err);
      alert('فشل الإعجاب بالقصة. يرجى تسجيل الدخول.');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/success-stories/${id}/comments`, { text: newCommentText });
      
      setComments(prevComments => [...prevComments, response.data]);
      setNewCommentText("");

    } catch (err) {
      console.error('Error adding comment:', err);
      alert('فشل إضافة التعليق. يرجى تسجيل الدخول.');
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
  if (error === '404') {
    return (
      <div className="text-center py-16 text-red-600">
        لم يتم العثور على القصة المطلوبة.<br />
        <Link to="/success-stories" className="text-indigo-600 underline">العودة إلى جميع القصص</Link>
      </div>
    );
  }
  if (error) return <div className="text-center py-16 text-red-600">{error}</div>;
  if (!story) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Link to="/success-stories" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium mb-8">
          <ArrowRight className="w-4 h-4 ml-2 rotate-180" />
          <span>العودة إلى جميع القصص</span>
        </Link>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {story.image && (
              <img
                src={`http://localhost:5000${story.image}`}
                alt={story.title}
                className="w-full md:w-80 h-80 object-cover rounded-xl mb-4 md:mb-0"
              />
            )}
            <div className="flex-1">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-4">
                <Star className="w-4 h-4 text-yellow-400 ml-2" />
                <span className="text-sm font-medium">قصة ملهمة</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{story.title}</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-xs font-semibold ${
                  parseInt(story.age) < 18
                    ? "bg-blue-500/90 text-white"
                    : parseInt(story.age) < 40
                    ? "bg-teal-500/90 text-white"
                    : "bg-indigo-500/90 text-white"
                }`}>
                  {parseInt(story.age) < 18 ? "طفل" : parseInt(story.age) < 40 ? "شاب" : "كبير"}
                </span>
                <span className="flex items-center gap-1 text-slate-600 text-sm">
                  <User className="w-4 h-4" />
                  {story.name}
                </span>
                <span className="flex items-center gap-1 text-slate-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  العمر: {story.age} سنة
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">{story.story}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition-colors duration-200 ${isLiked ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>
            <span className="text-slate-600">إعجاب</span>
          </div>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-xl p-8 mt-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">التعليقات ({comments.length})</h3>
          
          <form onSubmit={handleAddComment} className="mb-8 space-y-4">
            <div>
              <label htmlFor="newComment" className="sr-only">أضف تعليقاً</label>
              <textarea
                id="newComment"
                rows="3"
                className="w-full border-2 border-slate-200 rounded-xl p-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none"
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

          <div className="space-y-6">
            {comments.length === 0 ? (
              <p className="text-slate-600 text-center">لا توجد تعليقات حتى الآن.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment._id} className="bg-slate-50 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-slate-800">{comment.user?.fullName || 'مستخدم غير معروف'}</span>
                    <span className="text-xs text-slate-500">{new Date(comment.createdAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{comment.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 