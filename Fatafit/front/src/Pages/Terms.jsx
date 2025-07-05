import React from "react";
import { FileText, CheckCircle, User, Edit, Lock, Gift, Shield, RefreshCcw, AlertTriangle, Gavel } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 px-4 flex items-center justify-center" dir="rtl">
      <div className="max-w-3xl w-full bg-white/90 rounded-3xl shadow-2xl p-8 border border-blue-100 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-400 bg-clip-text text-transparent">الشروط والأحكام – جمعية فتافيت السكر</h1>
        </div>
        <p className="text-lg text-gray-700 mb-8">مرحبًا بكم في موقع جمعية فتافيت السكر، وهي جمعية خيرية تهدف إلى دعم الأطفال المصابين بمرض السكري. يرجى قراءة الشروط والأحكام التالية بعناية قبل استخدام خدماتنا أو موقعنا.</p>

        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">1. القبول بالشروط</h2>
            </div>
            <p className="text-gray-700">باستخدامك لموقع الجمعية أو أي من خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا لم توافق، يرجى عدم استخدام الموقع أو التسجيل في أي من برامجنا.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">2. الأهلية</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>خدمات الجمعية موجهة بشكل رئيسي للأطفال المصابين بالسكري وأولياء أمورهم.</li>
              <li>يجب أن يكون التسجيل لأي خدمة أو برنامج من قبل ولي أمر الطفل أو بإشرافه.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Edit className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">3. التسجيل والبيانات</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>عند التسجيل في أحد برامجنا أو ملء نموذج على الموقع، فإنك توافق على تقديم معلومات دقيقة وصحيحة.</li>
              <li>تلتزم الجمعية بالحفاظ على خصوصية بياناتكم وعدم استخدامها خارج نطاق الخدمة، وفق سياسة الخصوصية الخاصة بنا.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">4. استخدام الموقع والخدمات</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>يجب استخدام الموقع والخدمات لأغراض قانونية وخيرية فقط.</li>
              <li>يُمنع استخدام الموقع لنشر أو إرسال أي محتوى غير لائق أو مسيء أو ضار.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">5. التبرعات</h2>
            </div>
            <ul className="list-disc pr-6 text-gray-700 space-y-1">
              <li>الجمعية تقبل التبرعات عبر وسائل دفع محددة وآمنة.</li>
              <li>لا تُسترد التبرعات بعد إتمام العملية، إلا في حالات خاصة وبناءً على مراجعة إدارية.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">6. الملكية الفكرية</h2>
            </div>
            <p className="text-gray-700">جميع المحتويات الموجودة في الموقع (شعار الجمعية، النصوص، الصور، التصاميم) هي ملك لجمعية فتافيت السكر ويحظر نسخها أو استخدامها دون إذن مسبق.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <RefreshCcw className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">7. تعديل الشروط</h2>
            </div>
            <p className="text-gray-700">تحتفظ الجمعية بحق تعديل هذه الشروط في أي وقت، وسيتم نشر التعديلات على هذه الصفحة. استمرارك في استخدام الموقع بعد التعديل يعني موافقتك على الشروط الجديدة.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">8. إخلاء المسؤولية</h2>
            </div>
            <p className="text-gray-700">الجمعية تقدم خدماتها على أساس "كما هي" دون أي ضمانات.
الجمعية لا تتحمل أي مسؤولية عن أي أضرار ناتجة عن استخدام الموقع أو الاعتماد على المعلومات المنشورة فيه.</p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2">
              <Gavel className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-blue-700">9. القانون المعمول به</h2>
            </div>
            <p className="text-gray-700">تخضع هذه الشروط لقوانين المملكة الأردنية الهاشمية، ويُحال أي نزاع إلى المحاكم المختصة في الأردن.</p>
          </section>
        </div>
      </div>
    </div>
  );
} 