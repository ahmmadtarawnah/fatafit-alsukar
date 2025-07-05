import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Mail,
  User,
  Calendar,
  MessageSquare,
  Inbox,
  Clock,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedMessage, setExpandedMessage] = useState(null);
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setMessages(res.data);
      } catch (error) {
        console.error("فشل في جلب الرسائل:", error);
      }
    };

    fetchMessages();
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "عالية";
      case "medium":
        return "متوسطة";
      case "low":
        return "منخفضة";
      default:
        return "عادية";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                <Inbox className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  رسائل التواصل
                </h1>
                <p className="text-gray-600 mt-1">
                  إدارة ومتابعة جميع رسائل العملاء
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {messages.length} رسالة
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في الرسائل..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="pr-12 pl-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none min-w-40"
              >
                <option value="all">جميع الرسائل</option>
                <option value="high">أولوية عالية</option>
                <option value="medium">أولوية متوسطة</option>
                <option value="low">أولوية منخفضة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages Section */}
        {filteredMessages.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-12 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              لا توجد رسائل
            </h3>
            <p className="text-gray-500">
              لا توجد رسائل لعرضها في الوقت الحالي
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredMessages.map((msg, index) => (
              <div
                key={msg._id}
                className="group bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {msg.name}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Mail className="w-4 h-4 ml-2" />
                          <span className="text-sm">{msg.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      {msg.priority && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                            msg.priority
                          )}`}
                        >
                          {getPriorityText(msg.priority)}
                        </span>
                      )}
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="w-4 h-4 ml-1" />
                        {new Date(msg.createdAt).toLocaleDateString("ar-EG")}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <MessageSquare className="w-4 h-4 ml-2 text-indigo-600" />
                      {msg.subject}
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {expandedMessage === msg._id
                        ? msg.message
                        : msg.message && msg.message.length > 150
                        ? `${msg.message.substring(0, 150)}...`
                        : msg.message}
                    </p>
                    {msg.message && msg.message.length > 150 && (
                      <button
                        onClick={() =>
                          setExpandedMessage(
                            expandedMessage === msg._id ? null : msg._id
                          )
                        }
                        className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center transition-colors duration-200"
                      >
                        {expandedMessage === msg._id ? "عرض أقل" : "عرض المزيد"}
                        <ChevronDown
                          className={`w-4 h-4 mr-1 transition-transform duration-200 ${
                            expandedMessage === msg._id ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 ml-1" />
                      {new Date(msg.createdAt).toLocaleString("ar-EG")}
                    </div>
                    {/* <div className="flex space-x-2 rtl:space-x-reverse">
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium">
                        الرد
                      </button>
                      <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium">
                        أرشفة
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
