import React from "react";

export default function MembershipRequests({
  membershipRequests = [],
  updateMembershipStatus,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  طلبات الانتساب
                </h1>
                <p className="text-slate-600 text-lg">
                  مراجعة وإدارة طلبات الانتساب الجديدة
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-2xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
                <p className="text-slate-600 text-sm font-medium">إجمالي الطلبات</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{membershipRequests.length}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">طلبات مقبولة</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {membershipRequests.filter(req => req.status === "approved").length}
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
                <p className="text-slate-600 text-sm font-medium">قيد المراجعة</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">
                  {membershipRequests.filter(req => req.status === "pending").length}
                </p>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Requests Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">قائمة طلبات الانتساب</h3>
            <p className="text-slate-600 mt-1">مراجعة وإدارة طلبات الانتساب الجديدة والمعلقة</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الاسم</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">البريد الإلكتروني</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الهاتف</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">تاريخ الميلاد</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">معلومات إضافية</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الحالة</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {membershipRequests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gradient-to-r from-slate-100 to-blue-100 p-6 rounded-2xl mb-4">
                          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">لا توجد طلبات حالياً</h3>
                        <p className="text-slate-500">لم يتم العثور على أي طلبات انتساب جديدة</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  membershipRequests.map((req, index) => (
                    <tr 
                      key={req._id} 
                      className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {req.fullName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                              {req.fullName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                          <span className="text-slate-600 text-sm">{req.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-slate-600 text-sm">{req.phonenumber}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v8m0 0V9a2 2 0 012-2h4a2 2 0 012 2v10m-6 0a2 2 0 002 2h4a2 2 0 002-2m-6 0h6" />
                          </svg>
<span className="text-slate-600 text-sm">
  {new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(req.birthDate))}
</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="max-w-xs">
                          {req.additionalInfo ? (
                            <div className="bg-slate-50 rounded-lg p-2 text-sm text-slate-600 truncate" title={req.additionalInfo}>
                              {req.additionalInfo}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">-</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            req.status === "approved"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                              : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 border border-amber-200"
                          }`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              req.status === "approved" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          ></div>
                          {req.status === "approved" ? "تمت الموافقة" : "قيد المراجعة"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg transform ${
                            req.status === "approved"
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-200"
                              : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-200"
                          } shadow-lg`}
                          onClick={() =>
                            updateMembershipStatus(
                              req._id,
                              req.status === "approved" ? "pending" : "approved",
                              req.email,
                              req.fullName
                            )
                          }
                        >
                          <svg 
                            className={`w-4 h-4 ml-2`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            {req.status === "approved" ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            )}
                          </svg>
                          {req.status === "approved" ? "تعليق" : "الموافقة"}
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