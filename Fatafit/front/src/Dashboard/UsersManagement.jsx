import React from "react";

export default function UsersManagement({ users = [], updateUserStatus }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  إدارة المستفيدين
                </h1>
                <p className="text-slate-600 text-lg">
                  إدارة وتتبع حسابات المستفيدين من الخدمات
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">إجمالي المستفيدين</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{users.length}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">المستفيدين النشطين</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {users.filter(user => user.status === "نشط").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">المستفيدين المعلقين</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">
                  {users.filter(user => user.status === "غير نشط").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">قائمة المستفيدين</h3>
            <p className="text-slate-600 mt-1">عرض وإدارة جميع المستفيدين المسجلين</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الاسم</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الحالة</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">تاريخ الانضمام</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 rounded-2xl mb-4">
                          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد بيانات</h3>
                        <p className="text-slate-500">لم يتم العثور على أي مستفيدين مسجلين</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr 
                      key={user._id} 
                      className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {user.name}
                            </p>
                          </div>
                        </div>
                      </td>
                    
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            user.status === "نشط"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                              : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              user.status === "نشط" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          ></div>
                          {user.status}
                        </span>
                      </td>
                     <td className="py-4 px-6">
  <span className="text-slate-600">
    {new Intl.DateTimeFormat('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(user.joinDate))}
  </span>
</td>

                      <td className="py-4 px-6">
                        <button
                          className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
                            user.status === "نشط"
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-200"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-200"
                          } shadow-lg`}
                          onClick={() =>
                            updateUserStatus(
                              user._id,
                              user.status === "نشط" ? "غير نشط" : "نشط"
                            )
                          }
                        >
                          <svg 
                            className={`w-4 h-4 ml-2 ${user.status === "نشط" ? "" : ""}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            {user.status === "نشط" ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h6m-3-7a9 9 0 110 18 9 9 0 010-18z" />
                            )}
                          </svg>
                          {user.status === "نشط" ? "تعليق" : "تفعيل"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}