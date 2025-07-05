import React from "react";
import { Shield, User, Info, Lock, Users, FileText, Cookie } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 flex items-center justify-center" dir="rtl">
      <div className="max-w-3xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 border border-blue-100 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent">سياسة الخصوصية – جمعية فتافيت السكر</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">في جمعية فتافيت السكر، نحترم خصوصيتكم ونلتزم بحماية البيانات الشخصية التي نجمعها منكم. توضح هذه السياسة كيفية جمع المعلومات، واستخدامها، ومشاركتها، وحمايتها.</p>

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">1. من نحن؟</h2>
            </div>
            <p className="text-gray-700">جمعية فتافيت السكر هي جمعية غير ربحية تُعنى بدعم الأطفال المصابين بمرض السكري، وتقديم التوعية والمساعدة لهم ولعائلاتهم.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">2. المعلومات التي نقوم بجمعها:</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>الاسم الكامل</li>
              <li>تاريخ الميلاد (للأطفال المرضى)</li>
              <li>معلومات التواصل (الهاتف، البريد الإلكتروني)</li>
              <li>المعلومات الصحية المتعلقة بالسكري (بموافقة ولي الأمر)</li>
              <li>معلومات التبرع (الاسم، المبلغ، وسيلة الدفع)</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">3. كيف نستخدم هذه المعلومات؟</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>تقديم الدعم الطبي أو النفسي أو التوعوي للأطفال المرضى</li>
              <li>التواصل مع أولياء الأمور بخصوص الأنشطة أو البرامج أو المواعيد</li>
              <li>إرسال رسائل شكر وتحديثات للمتبرعين</li>
              <li>تحسين خدمات الجمعية</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">4. من يمكنه الاطلاع على معلوماتكم؟</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>نحن لا نبيع أو نشارك معلوماتكم مع أي جهة خارجية لأغراض تجارية.</li>
              <li>قد يتم مشاركة بعض المعلومات مع:
                <ul className="list-disc pr-6 mt-1">
                  <li>الفرق الطبية أو التوعوية العاملة معنا (بسرية تامة)</li>
                  <li>الجهات الحكومية إذا طُلب منا قانونياً</li>
                </ul>
              </li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">5. حماية المعلومات:</h2>
            </div>
            <p className="text-gray-700">نستخدم وسائل حماية مناسبة (رقمية وفعلية) لضمان عدم تسريب أو إساءة استخدام المعلومات. لا يمكننا ضمان الحماية 100%، لكننا نعمل بأقصى ما يمكن لحماية بياناتكم.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">6. حقوقكم:</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>يمكنكم طلب الوصول إلى بياناتكم أو تعديلها أو حذفها في أي وقت.</li>
              <li>أولياء الأمور لهم الحق الكامل في إدارة بيانات أطفالهم.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">7. ملفات تعريف الارتباط (Cookies):</h2>
            </div>
            <p className="text-gray-700">إذا كنتم تستخدمون موقعنا الإلكتروني، فقد نستخدم ملفات تعريف الارتباط لتحسين تجربتكم. يمكنكم التحكم بهذه الإعدادات من خلال متصفحكم.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 