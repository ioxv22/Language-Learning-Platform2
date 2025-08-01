import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:54112'; // رابط الـ backend الافتراضي

export const fetchCourses = () => {
  return axios.get(`${API_BASE_URL}/api/courses`);
};

// تقدر تضيف دوال أخرى بنفس الطريقة لاستدعاء باقي الـ API
