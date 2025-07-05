import React from 'react';
import { Mail, Phone, Star, Zap, Sparkles, Users, Award, Code } from 'lucide-react';

// Import profile pictures from Shared directory
import ahmadPic from '../Shared/ahmad al tarawneh.png';
import ramiPic from '../Shared/rami .jpg';
import belalPic from '../Shared/belal kahaleh.jpg';
import jenanPic from '../Shared/jenan.jpg';
import deyaaPic from '../Shared/deyaa.jpg';
import mustafaPic from '../Shared/mustafa .jpg';
import mohammadPic from '../Shared/mohammad alsarawi.jpg';

export default function Team() {
  const scrumMasters = [
    {
      name: "احمد الطراونة",
      email: "ahmmadtarawnah@gmail.com",
      phone: "+962793939352",
      role: "Scrum Master",
      image: ahmadPic,
      description: "قائد الفريق. كما أنه مطور في المنصة."
    },
    {
      name: "رامي عبدالحميد",
      email: "ramighassan10@gmail.com",
      phone: "+962785956180",
      role: "Scrum Master",
      image: ramiPic,
      description: "مسؤول التنسيق والإدارة. كما أنه مطور في المنصة."
    }
  ];

  const qa = [
    {
      name: "بلال كحالة",
      email: "Belalkh274@gmail.com",
      phone: "+962781373708",
      role: "QA Engineer",
      image: belalPic,
      description: "ضمان الجودة واختبار المنصة. كما أنه مطور في المنصة."
    },
    {
      name: "جنان فرج",
      email: "jenan.faraj4@gmail.com",
      phone: "+962780798572",
      role: "QA Engineer",
      image: jenanPic,
      description: "ضمان الجودة واختبار المنصة. كما أنها مطورة في المنصة."
    }
  ];

  const developers = [
    {
      name: "ضياء ابو الرب",
      email: "dyaaabualrub12@gmail.com",
      phone: "+962782520227",
      role: "Developer",
      image: deyaaPic,
      description: "تطوير وبرمجة المنصة."
    },
    {
      name: "مصطفى عبيدات",
      email: "mustafaobiedat3@gmail.com",
      phone: "+962779538580",
      role: "Developer",
      image: mustafaPic,
      description: "تطوير وبرمجة المنصة."
    },
    {
      name: "محمد الصراوي",
      email: "m.z.sarrawi@gmail.com",
      phone: "+962787750815",
      role: "Developer",
      image: mohammadPic,
      description: "تطوير وبرمجة المنصة."
    }
  ];

  const TeamMemberCard = ({ member, color, icon }) => (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mb-10 border border-blue-100 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="md:w-56 w-full h-56 md:h-auto flex-shrink-0 bg-gray-100">
        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
      </div>
      {/* Info */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${color} text-white shadow-md`}>{icon}</span>
            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
          </div>
          <span className={`inline-block mb-2 px-3 py-1 rounded-full text-sm font-semibold ${color} bg-opacity-10 text-${color.split('-')[1]}-700`}>{member.role}</span>
          <p className="text-gray-600 mb-4 mt-2">{member.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium">
            <Mail className="w-5 h-5" />
            <span>{member.email}</span>
          </a>
          <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium">
            <Phone className="w-5 h-5" />
            <span>{member.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Hero/Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-yellow-400 py-16 mb-16 shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div className="max-w-5xl mx-auto px-4 flex flex-col items-center text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 shadow-lg">
              <Users className="w-12 h-12 text-white" />
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">فريق التطوير</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-4">تعرف على أعضاء الفريق الذين قاموا بتطوير منصة فتافيت السكر بأحدث التقنيات والمعايير العالمية</p>
          <div className="flex flex-wrap justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">7</div>
              <div className="text-blue-100 text-sm">أعضاء الفريق</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-blue-100 text-sm">تخصصات مختلفة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-blue-100 text-sm">التزام بالجودة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        {/* Scrum Masters */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-7 h-7 text-yellow-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-700">Scrum Masters</h2>
            <span className="flex-1 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-100 ml-4" />
          </div>
          {scrumMasters.map((member, idx) => (
            <TeamMemberCard key={idx} member={member} color="bg-yellow-500" icon={<Star className="w-6 h-6" />} />
          ))}
        </div>
        {/* QA Engineers */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="w-7 h-7 text-emerald-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">QA Engineers</h2>
            <span className="flex-1 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-100 ml-4" />
          </div>
          {qa.map((member, idx) => (
            <TeamMemberCard key={idx} member={member} color="bg-emerald-500" icon={<Zap className="w-6 h-6" />} />
          ))}
        </div>
        {/* Developers */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Code className="w-7 h-7 text-blue-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700">Developers</h2>
            <span className="flex-1 h-0.5 bg-gradient-to-r from-blue-400 to-blue-100 ml-4" />
          </div>
          {developers.map((member, idx) => (
            <TeamMemberCard key={idx} member={member} color="bg-blue-500" icon={<Sparkles className="w-6 h-6" />} />
          ))}
        </div>
      </div>
    </div>
  );
}