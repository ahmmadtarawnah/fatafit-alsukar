import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Users, UserCircle } from 'lucide-react';
import './RegistrationOptions.css';

const RegistrationOptions = () => {
  const options = [
    {
      title: 'تسجيل مستفيد جديد',
      description: 'سجل كمستفيد جديد للحصول على خدماتنا المميزة والدعم المتواصل',
      path: '/patientrequest',
      icon: <UserPlus className="w-8 h-8" />,
      color: 'from-emerald-400 to-teal-500',
      shadowColor: 'rgba(52, 211, 153, 0.2)'
    },
    {
      title: 'تسجيل متطوع',
      description: 'كن جزءاً من فريقنا وساهم في مساعدة الآخرين وإحداث تغيير إيجابي',
      path: '/volunteerrequest',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-400 to-indigo-500',
      shadowColor: 'rgba(99, 102, 241, 0.2)'
    },
    {
      title: 'تسجيل عضوية',
      description: 'انضم إلى عائلتنا واستفد من جميع الخدمات والأنشطة المقدمة',
      path: '/membershiprequest',
      icon: <UserCircle className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-500',
      shadowColor: 'rgba(168, 85, 247, 0.2)'
    }
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="registration-section py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-50 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">انضم إلينا</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر طريقة انضمامك إلى عائلتنا وكن جزءاً من مجتمعنا الداعم
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `0 20px 40px ${option.shadowColor}` }}
              ></div>
              
              <Link
                to={option.path}
                onClick={() => window.scrollTo(0, 0)}
                className="block relative bg-white rounded-3xl overflow-hidden transition-all duration-300"
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${option.color} text-white mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                    {option.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {option.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {option.description}
                  </p>
                  
                  <div className={`inline-flex items-center justify-center w-full py-4 px-6 rounded-xl bg-gradient-to-r ${option.color} text-white text-lg font-semibold transition-all duration-300 transform hover:scale-105`}>
                    سجل الآن
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RegistrationOptions; 