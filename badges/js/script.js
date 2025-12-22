const badgeLevels = [
    {
        level: 1,
        title: "البذرة الأولى",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "لقد بدأت رحلتك للتو. هذه الشارة تُمنح للوافدين الجدد الذين أخذوا الخطوة الأولى.",
        requirements: ["إكمال الملف الشخصي 100%", "نشر أول مشاركة", "التعليق على موضوعين"]
    },
    {
        level: 2,
        title: "الزارع الناشئ",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "بدأت جذورك تضرب في الأرض. لقد بدأت تترك أثراً في المجتمع.",
        requirements: ["الوصول لـ 50 نقطة", "التفاعل لمدة 3 أيام متتالية", "الحصول على 5 إعجابات"]
    },
    {
        level: 3,
        title: "برعم الأمل",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "أنت تنمو بسرعة! مشاركاتك بدأت تلفت الأنظار.",
        requirements: ["نشر 5 مواضيع مفيدة", "متابعة 10 أعضاء", "الحصول على شارة التفاعل اليومي"]
    },
    {
        level: 4,
        title: "ساق النماء",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "لقد أصبحت ركيزة في المنتدى. يعتمد البعض على ردودك.",
        requirements: ["تجاوز 200 نقطة", "الرد على 20 استفساراً", "نشر صور لتجاربك الزراعية"]
    },
    {
        level: 5,
        title: "الورقة الخضراء",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "أنت الآن تساهم في تجميل مجتمعنا بوجودك المستمر.",
        requirements: ["عضوية لمدة شهر كامل", "مساعدة عضو جديد", "الحصول على 50 إعجاب إجمالي"]
    },
    {
        level: 6,
        title: "صديق البيئة",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "تدافع عن الطبيعة وتنشر الوعي البيئي بيننا.",
        requirements: ["نشر موضوع عن التدوير", "المشاركة في حملة توعية", "دعوة صديق للانضمام"]
    },
    {
        level: 7,
        title: "المزارع النشط",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "حركتك لا تتوقف، أنت شعلة نشاط في الأقسام.",
        requirements: ["نشر 15 تعليقاً في يوم واحد", "تجاوز 500 نقطة", "إضافة 3 مواضيع للمفضلة"]
    },
    {
        level: 8,
        title: "جني الثمار",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "بدأت تحصد نتيجة تفاعلك وحب الناس لمحتواك.",
        requirements: ["الحصول على لقب 'موضوع الأسبوع'", "100 متابع", "مشاركة 5 نصائح حصرية"]
    },
    {
        level: 9,
        title: "حارس الحديقة",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "أنت تحافظ على جودة المحتوى وتبلغ عن المخالفات.",
        requirements: ["تقديم 10 بلاغات صحيحة", "التواجد اليومي لمدة أسبوعين", "تقييم 20 موضوعاً"]
    },
    {
        level: 10,
        title: "خبير التربة",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "وصلت لمنتصف الطريق! أنت الآن مرجع في أساسيات الزراعة.",
        requirements: ["تجاوز 1000 نقطة سمعة", "كتابة دليل شامل عن التربة", "الحصول على 200 إعجاب"]
    },
    {
        level: 11,
        title: "ساقي المعرفة",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "تروي عقول الأعضاء بمعلوماتك القيمة والموثقة.",
        requirements: ["نشر 50 موضوعاً", "الإجابة على 10 أسئلة تقنية", "التفاعل مع منشورات قديمة"]
    },
    {
        level: 12,
        title: "مهندس المناظر",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "لديك ذوق رفيع في تنسيق الحدائق ونشر الجمال.",
        requirements: ["مشاركة ألبوم صور لحديقتك", "الفوز بمسابقة أجمل تنسيق", "عضوية لمدة 3 أشهر"]
    },
    {
        level: 13,
        title: "قاهر الصحراء",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "تستطيع إيجاد حلول لأصعب الظروف الزراعية.",
        requirements: ["نشر حل لمشكلة زراعية صعبة", "تجاوز 2500 نقطة", "مساعدة 50 عضواً"]
    },
    {
        level: 14,
        title: "حكيم النبات",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "كلامك موزون ونصائحك دائماً ما تكون في محلها.",
        requirements: ["عدم تلقي أي إنذار لـ 6 أشهر", "كتابة 10 مقالات مطولة", "300 متابع"]
    },
    {
        level: 15,
        title: "سفير الطبيعة",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "تمثل مجتمع 'زراع' بأفضل صورة في كل مكان.",
        requirements: ["تجاوز 5000 نقطة", "نشر فيديو تعليمي", "الحصول على وسام التميز"]
    },
    {
        level: 16,
        title: "مروض الزهور",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "تخصصت في الجمال وأصبحت مرجعاً في نباتات الزينة.",
        requirements: ["تصنيف 100 نوع من الزهور", "إنشاء موسوعة مصغرة", "تفاعل 500 عضو معك"]
    },
    {
        level: 17,
        title: "المزارع العالمي",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "ثقافتك الزراعية تخطت الحدود المحلية.",
        requirements: ["ترجمة مقال علمي زراعي", "تجاوز 10,000 نقطة", "عضوية لمدة سنة"]
    },
    {
        level: 18,
        title: "سيد الحصاد",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "أنت الآن من كبار الشخصيات المؤثرة في المجتمع.",
        requirements: ["الحصول على 1000 إعجاب", "إدارة قسم فرعي أو مبادرة", "نشر 200 موضوع"]
    },
    {
        level: 19,
        title: "مستشار الزراعة",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "أنت المرجع الأول والخير قبل اتخاذ أي قرار زراعي.",
        requirements: ["تجاوز 20,000 نقطة", "حل 500 مشكلة للأعضاء", "ثقة الإدارة الكاملة"]
    },
    {
        level: 20,
        title: "الأسطورة الخضراء",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
        description: "أعلى مقام يمكن الوصول إليه. أنت روح هذا المجتمع ورمز لنموه.",
        requirements: ["عضوية لمدة سنتين", "تأثير غير مسبوق", "الوصول لقمة الترتيب العام"]
    }
];

// 2. دالة عرض البيانات (Loop)
function displayBadges() {
    const container = document.getElementById('badgesContainer');
    
    // تفريغ الحاوية قبل الإضافة
    container.innerHTML = '';

    badgeLevels.forEach(badge => {
        // إنشاء قائمة المتطلبات كـ HTML
        const reqList = badge.requirements.map(req => `
            <li><i class="bi bi-check-circle"></i> ${req}</li>
        `).join('');

        // هيكل الكارد (نفس بنيتك تماماً)
        const badgeHTML = `
            <div class="badge-card" data-aos="fade-up">
                <img src="${badge.image}" alt="profile">
                <span class="level">المستوى ${badge.level}</span>
                <h3>${badge.title}</h3>
                <p>${badge.description}</p>

                <div class="requirements">
                    <strong>المتطلبات</strong>
                    <div>
                        <ul>
                            ${reqList}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // إضافة الكارد إلى الصفحة
        container.innerHTML += badgeHTML;
    });
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayBadges);