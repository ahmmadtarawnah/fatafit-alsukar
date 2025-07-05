import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Heart, ArrowLeft, Send } from 'lucide-react';
import logoImg from "./Screenshot_2025-05-09_132412-removebg-preview (1).png";
import whatsappIcon from "./icons8-whatsapp.gif";
import instagramIcon from "./icons8-instagram.gif";
import facebookIcon from "./icons8-facebook-48 (1).png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#EBF8FF] to-[#BEE3F8] text-[#2B6CB0] relative overflow-hidden" dir="rtl">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-10 w-24 h-24 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-100 rounded-full blur-2xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Brand Section with Logo */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {/* Logo and Title */}
              <div className="flex items-center gap-4">
                <img 
                  src={logoImg}
                  alt="فتافيت السكر" 
                  className="w-32 h-32 object-contain"
                />
                <div>
                  <h3 className="text-xl font-bold text-[#2B6CB0]">فتافيت السكر </h3>
                  <p className="text-blue-600 text-sm">جمعية خيرية للأطفال</p>
                </div>
              </div>
              
             
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-[#2B6CB0]">تابعونا</h4>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/p/%D8%AC%D9%85%D8%B9%D9%8A%D8%A9-%D8%A3%D8%B7%D9%81%D8%A7%D9%84-%D9%81%D8%AA%D8%A7%D9%81%D9%8A%D8%AA-%D8%A7%D9%84%D8%B3%D9%83%D8%B1-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D9%8A%D8%A9-61557610734202/" target="_blank" rel="noopener noreferrer" className="group p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-blue-200 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all duration-300 shadow-sm">
                  <img src={facebookIcon} alt="Facebook" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.instagram.com/fatafeetalsukar24?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="group p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-blue-200 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all duration-300 shadow-sm">
                  <img src={instagramIcon} alt="Instagram" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://wa.me/962790000000" target="_blank" rel="noopener noreferrer" className="group p-2 rounded-lg bg-white/80 backdrop-blur-sm border border-blue-200 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all duration-300 shadow-sm">
                  <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-[#2B6CB0] mb-4 relative">
                روابط سريعة
                <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-l from-blue-400 to-transparent"></div>
              </h4>
              <ul className="space-y-2">
                {[
                  { to: "/", label: "الصفحة الرئيسية" },
                  { to: "/Activities", label: "الفعاليات والنشاطات" },
                  { to: "/Services", label: "خدماتنا" },
                  { to: "/donation", label: "تبرع لحبة سكر" }
                ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.to} 
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-blue-600 hover:text-[#2B6CB0] transition-colors flex items-center gap-2 group py-1 hover:pr-2 transition-all duration-300"
                    >
                      <ArrowLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                      <span className="text-sm group-hover:font-medium transition-all">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-[#2B6CB0] mb-4 relative">
                تواصل معنا
                <div className="absolute bottom-0 right-0 w-12 h-0.5 bg-gradient-to-l from-blue-400 to-transparent"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { icon: Phone, text: "+962 7 8151 9422" },
                  { icon: Mail, text: "fatafeatskr@gmail.com" },
                  { icon: MapPin, text: "عمان، الأردن" }
                ].map((contact, index) => (
                  <li key={index} className="flex items-center gap-3 text-blue-600 group">
                    <div className="p-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-blue-200 group-hover:bg-blue-50 transition-all shadow-sm">
                      <contact.icon className="w-4 h-4" />
                    </div>
                    {contact.icon === Phone ? (
                      <span dir="ltr" className="text-sm font-mono group-hover:text-[#2B6CB0] transition-colors">{contact.text}</span>
                    ) : (
                      <span className="text-sm group-hover:text-[#2B6CB0] transition-colors">{contact.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-blue-600">
            <div className="flex items-center gap-2">
              <span className="text-sm">تم التطوير بواسطة أكاديمية أورنج للبرمجة- فرع الزرقاء</span>
              <img 
                src="/src/Shared/Orange_logo.svg.webp" 
                alt="Orange Academy Logo" 
                className="h-4 w-auto"
              />
            </div>
            <div className="hidden sm:block w-px h-4 bg-blue-300/50"></div>
            <Link to="/team" className="text-sm hover:text-[#2B6CB0] transition-colors flex items-center gap-2 group">
              <span>فريق التطوير</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-blue-600">
            <Link to="/privacy" className="hover:text-[#2B6CB0] transition-colors">سياسة الخصوصية</Link>
            <div className="w-px h-4 bg-blue-300/50"></div>
            <Link to="/terms" className="hover:text-[#2B6CB0] transition-colors">الشروط والأحكام</Link>
          </div>
        </div>

     
      </div>
    </footer>
  );
}