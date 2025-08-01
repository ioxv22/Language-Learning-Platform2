// ===================================
// Language Learning Platform - Backend Server
// Node.js + Express API Server
// ===================================

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// إنشاء تطبيق Express
const app = express();
const PORT = process.env.PORT || 54112;

// ===================================
// Middleware Configuration
// إعداد الوسطاء
// ===================================

// إعداد قائمة النطاقات المسموحة في CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://language-learning-platform2-frontend.netlify.app' // الرابط اللي طلبته
];

// إعداد CORS مع السماح بالنطاقات المحددة
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body Parser - لتحليل JSON في الطلبات
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// إعداد لحفظ ملفات الوسائط الثابتة
app.use('/static', express.static('public'));

// ===================================
// Data Loading Functions
// وظائف تحميل البيانات
// ===================================

function loadLessonsData() {
  try {
    const dataPath = path.join(__dirname, 'data', 'rich-content.json');
    const data = fs.readFileSync(dataPath, 'utf8');
    const parsedData = JSON.parse(data);
    
    return {
      courses: parsedData.courses || [],
      lessons: parsedData.lessons || [],
      paragraphs: parsedData.paragraphs || [],
      keywords: parsedData.keywords || [],
      quizzes: parsedData.quizzes || [],
      exercises: parsedData.exercises || [],
      contact_info: parsedData.contact_info || {}
    };
  } catch (error) {
    console.error('خطأ في تحميل بيانات الدروس:', error);
    return { courses: [], lessons: [], paragraphs: [], keywords: [], quizzes: [], exercises: [] };
  }
}

function saveLessonsData(data) {
  try {
    const dataPath = path.join(__dirname, 'data', 'lessons.json');
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('خطأ في حفظ البيانات:', error);
    return false;
  }
}

let lessonsData = loadLessonsData();

// ===================================
// API Routes - المسارات
// ===================================

app.get('/', (req, res) => {
  res.json({
    message: 'مرحباً بك في منصة تعليم اللغات! 🌐',
    version: '1.0.0',
    endpoints: {
      'GET /api/courses': 'جلب جميع الكورسات',
      'GET /api/courses/:courseId': 'جلب كورس محدد',
      'GET /api/courses/:courseId/lessons': 'جلب دروس كورس',
      'GET /api/lessons/:lessonId': 'جلب درس محدد',
      'GET /api/paragraphs/:paragraphId': 'جلب فقرة محددة',
      'POST /api/quiz/submit': 'إرسال إجابات الاختبار',
      'POST /api/writing/check': 'فحص تمارين الكتابة',
      'GET /api/search': 'البحث في المحتوى'
    },
    documentation: `http://localhost:${PORT}/api/docs`
  });
});

// باقي مسارات API نفس الكود عندك (courses, lessons, paragraphs, quiz, writing, search, stats)
// ...

// ضع هنا كل مسارات API كما في الكود الأصلي بدون تغيير (يمكنني أرسل لك نسخة كاملة إذا تريد)

// ===================================
// Server Start - بدء تشغيل السيرفر
// ===================================

app.listen(PORT, () => {
  console.log(`
🚀 سيرفر منصة تعليم اللغات يعمل بنجاح!
📍 العنوان: http://localhost:${PORT}
📚 API التوثيق: http://localhost:${PORT}/
🌐 الكورسات: http://localhost:${PORT}/api/courses
📖 الإحصائيات: http://localhost:${PORT}/api/stats
🔍 البحث: http://localhost:${PORT}/api/search?q=hello
🎯 جاهز لاستقبال الطلبات!
  `);
});

module.exports = app;
