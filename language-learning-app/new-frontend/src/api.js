import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'https://language-learning-platform2.onrender.com';
export const fetchCourses = () => {
  return axios.get(`${API_BASE_URL}/api/courses`);
};

// تقدر تضيف دوال أخرى بنفس الطريقة لاستدعاء باقي الـ API
