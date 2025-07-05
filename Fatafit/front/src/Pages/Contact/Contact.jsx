import { useState } from "react";
import axios from "axios";
import { Mail, User, MessageCircle, Send, MapPin, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import logoImg from "../../Shared/Screenshot_2025-05-09_132412-removebg-preview (1).png";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      setSuccess("تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريباً.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#BEE3F8] via-[#EBF8FF] to-[#BEE3F8] flex flex-col justify-start items-center">
      {/* SVG Wave Background */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-40 md:h-64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#63b3ed" fillOpacity="0.25" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center pt-12 md:pt-20 pb-8">
        <img
          src={logoImg}
          alt="كتاكيت السكر"
          className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-xl animate-float"
          style={{ animation: 'float 4s ease-in-out infinite' }}
        />
        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#2B6CB0] text-center drop-shadow-lg">تواصل معنا</h1>
        <p className="mt-4 text-lg md:text-2xl text-blue-700 text-center max-w-2xl mx-auto">نحن هنا للإجابة على جميع استفساراتك واقتراحاتك. يسعدنا تواصلك معنا في أي وقت!</p>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 w-full flex flex-col items-center justify-center pb-16">
        <form
          onSubmit={handleSubmit}
          dir="rtl"
          className="w-full max-w-xl mx-auto mt-2 md:mt-0 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 px-6 md:px-12 py-10 flex flex-col gap-6 animate-fade-in"
          style={{ boxShadow: '0 8px 32px 0 rgba(99,179,237,0.15)' }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-blue-700 font-medium">الاسم</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full pr-10 pl-3 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/90 text-blue-900 text-lg"
                placeholder="اسمك الكامل"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-blue-700 font-medium">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pr-10 pl-3 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/90 text-blue-900 text-lg"
                placeholder="example@email.com"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-blue-700 font-medium">الموضوع</label>
            <div className="relative">
              <MessageCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 w-5 h-5" />
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full pr-10 pl-3 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/90 text-blue-900 text-lg"
                placeholder="موضوع الرسالة"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-blue-700 font-medium">الرسالة</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full pr-3 pl-3 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white/90 text-blue-900 text-lg resize-none"
              placeholder="اكتب رسالتك هنا..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 animate-bounce" />
            {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
          </button>
          {success && <div className="text-green-600 text-center font-semibold mt-2 animate-fade-in">{success}</div>}
          {error && <div className="text-red-600 text-center font-semibold mt-2 animate-fade-in">{error}</div>}
        </form>
      </section>

      {/* Contact Info Floating Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-blue-100 flex flex-col gap-4 items-start min-w-[240px] max-w-xs animate-fade-in">
        <div className="flex items-center gap-3">
          <Mail className="w-6 h-6 text-blue-500" />
          <span className="text-blue-700 font-semibold text-base">info@fatafit.com</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 text-blue-500" />
          <span className="text-blue-700 font-semibold text-base">+962 6 123 4567</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-500" />
          <span className="text-blue-700 font-semibold text-base">عمان، الأردن</span>
        </div>
        <div className="flex gap-3 w-full justify-center mt-2">
          <a href="#" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all"><Facebook className="w-5 h-5 text-blue-600" /></a>
          <a href="#" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all"><Instagram className="w-5 h-5 text-pink-500" /></a>
          <a href="#" className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-all"><Twitter className="w-5 h-5 text-blue-400" /></a>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </div>
  );
}
