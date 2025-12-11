export const getCurrentDateTime=() =>{
  // 1. إنشاء كائن التاريخ والوقت الحالي
  const now = new Date();

  // 2. تنسيق الوقت (الساعة 12، دقيقة، ثواني، AM/PM)
  // نستخدم Intl.DateTimeFormat لضمان التنسيق الصحيح للنظام 12 ساعة وam/pm
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // نظام 12 ساعة
  };
  const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(
    now,
  );

  // 3. تنسيق التاريخ (اليوم، الشهر، السنة)
  const dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = new Intl.DateTimeFormat('ar-EG', dateOptions).format(
    now,
  );

  // 4. بناء السلسلة النصية: [الساعة] - [التاريخ] (مع مراعاة الترتيب العربي)
  // بما أننا نريد الساعة يمين والتاريخ يسار، ستكون السلسلة: [الساعة] - [التاريخ]
  return `${formattedTime} - ${formattedDate}`;
}

// 5. الاستدعاء وتخزين النتيجة في متغير واحد
const currentDisplay = getCurrentDateTime();

// 6. طباعة النتيجة (مثال)
console.log(currentDisplay);
