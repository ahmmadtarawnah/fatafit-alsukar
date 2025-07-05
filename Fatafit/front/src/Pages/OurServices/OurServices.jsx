import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Clock, ArrowRight, Sparkles, Heart, Shield } from "lucide-react";

// تعريف الألوان الخاصة بالموقع
const colors = {
  lightBlue: "#4A90E2",
  darkBlue: "#1D3E79",
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/services");
        if (!response.ok) {
          throw new Error("فشل في جلب البيانات من الخادم");
        }
        const data = await response.json();
        console.log("البيانات المستلمة:", data);

        setServices(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة مرة أخرى.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 rtl">
      {/* Hero Section - Enhanced with glassmorphism */}
      <div className="relative overflow-hidden">
        {/* Background with multiple layers */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://i.pinimg.com/736x/6a/8c/64/6a8c640d6a6ed65d59e389f32f2d9d3d.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/60 to-blue-800/80" />
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-300/10 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-white p-8">
          {/* Floating badge */}
          <div className="mb-6 px-6 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              خدمات مميزة لأطفال السكري
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            خدماتنا
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-4xl leading-relaxed text-blue-100">
            نقدم مجموعة من الخدمات الداعمة لأطفال السكري وعائلاتهم لتحسين جودة حياتهم
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Modern card grid */}
      <div className="container mx-auto py-20 px-6">
        {/* Section header with modern styling */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            خدمات متميزة
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
            خدمات جمعية أطفال كتاكيت السكر
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            نسعى لتقديم الدعم الشامل لمساعدة الأطفال المصابين بالسكري وعائلاتهم على التعايش بصورة أفضل مع المرض
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600" />
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600 animate-reverse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-red-700 text-lg mb-6">{error}</p>
              <button
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:mx-25 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} colors={colors} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* How to Request Section - Redesigned with glassmorphism */}
      <div className="relative py-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-pink-50/40" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-300/20 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full text-sm font-medium mb-4">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              خطوات بسيطة
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-purple-800 bg-clip-text text-transparent">
              كيفية طلب الخدمة
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              خطوات بسيطة للحصول على خدماتنا المجانية للأطفال المصابين بالسكري
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <StepCard
              number="1"
              title="تقديم الطلب"
              description="قم بتعبئة نموذج طلب الخدمة من خلال موقعنا الإلكتروني أو زيارة مقر الجمعية"
              colors={colors}
            />
            <StepCard
              number="2"
              title="دراسة الحالة"
              description="سيقوم فريقنا المختص بدراسة طلبك وتحديد الاحتياجات المناسبة"
              colors={colors}
            />
            <StepCard
              number="3"
              title="تقديم الخدمة"
              description="سيتم التواصل معك لتحديد موعد وآلية تقديم الخدمة المطلوبة"
              colors={colors}
            />
          </div>

          <div className="text-center">
            <button className="group relative px-12 py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-translate-y-1">
              <span className="relative z-10">تقديم طلب خدمة</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced with modern gradient */}
      <div className="relative py-20 px-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900" />
        <div className="absolute inset-0">
          <div className={"absolute top-0 left-0 w-full h-full bg-[url(`data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`)]"} />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <Heart className="w-5 h-5 text-pink-300" />
            <span className="text-sm font-medium">كن جزءاً من التغيير</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            ساهم معنا في دعم أطفال كتاكيت السكر
          </h2>
          <p className="text-xl max-w-4xl mx-auto mb-12 text-blue-100 leading-relaxed">
            تبرعك، مهما كان بسيطاً، يساهم في توفير الدعم المادي والمعنوي للأطفال المصابين بالسكري وعائلاتهم
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="group relative px-10 py-4 bg-white text-blue-900 text-lg font-bold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-white/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
              <span className="relative z-10">تبرع الآن</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="group px-10 py-4 text-lg font-bold border-2 border-white/50 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-white transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm">
              تواصل معنا
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, colors, index }) {
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 overflow-hidden border border-white/50 hover:border-blue-200/50 transform hover:scale-[1.02] hover:-translate-y-2"
      style={{ 
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out both'
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-all duration-700" />

      {/* صورة الخدمة */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        <img
          src={service.image || "/api/placeholder/400/300"}
          alt={service.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300";
          }}
        />

        {/* عداد الطلبات - Enhanced design */}
        <div className="absolute top-6 right-6 z-20">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl border border-white/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <Users size={16} className="text-blue-600" />
            <span className="text-sm font-bold text-gray-800">
              {service.requestsCount || service.requestedBy?.length || 0}
            </span>
          </div>
        </div>

        {/* مؤشر جديد - Enhanced */}
        {new Date() - new Date(service.createdAt) < 7 * 24 * 60 * 60 * 1000 && (
          <div className="absolute top-6 left-6 z-20">
            <div className="bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-xl animate-pulse">
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                جديد
              </div>
            </div>
          </div>
        )}

        {/* Floating elements */}
        <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-400/60 rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-purple-400/60 rounded-full animate-bounce delay-100" />
            <div className="w-3 h-3 bg-pink-400/60 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="relative p-8 z-10">
        {/* العنوان */}
        <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
          {service.name}
        </h3>

        {/* الوصف */}
        <p className="text-gray-600 mb-6 leading-relaxed text-lg line-clamp-3">
          {service.description}
        </p>

        {/* معلومات إضافية */}
        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1">
            <Clock size={14} />
            <span>
              {new Date(service.createdAt).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* زر طلب الخدمة - Enhanced */}
        <Link to={`/patientrequest?serviceType=${service._id}`}>
          <button className="w-full group/btn relative overflow-hidden rounded-2xl py-4 px-8 font-bold text-white transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600">
            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              طلب الخدمة
              <ArrowRight
                size={20}
                className="transition-all duration-300 group-hover/btn:translate-x-2 group-hover/btn:scale-110"
              />
            </span>

            {/* تأثير الهوفر المتقدم */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out delay-200" />
          </button>
        </Link>
      </div>

      {/* حد متوهج متقدم */}
      <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-300/30 transition-all duration-500 pointer-events-none" />
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
    </div>
  );
}

// مكون بطاقة الخطوات - Enhanced
function StepCard({ number, title, description, colors }) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center border border-white/50 hover:border-blue-200/50 transition-all duration-500 hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-purple-50/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
            style={{ 
              background: `linear-gradient(135deg, ${colors.lightBlue}, ${colors.darkBlue})` 
            }}
          >
            {number}
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-lg">{description}</p>
      </div>
    </div>
  );
}

// Add custom styles for animations
const customStyles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}