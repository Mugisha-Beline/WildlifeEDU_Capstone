// src/utils/api.js
// Base URL of your backend server
const API_URL = '/api'; // Modify based on your actual API endpoint

// Function to fetch all courses
export const getAllCourses = async () => {
  const response = await fetch(`${API_URL}/courses/all`);
  const data = await response.json();
  return data;
};

// Function to fetch user-enrolled courses with progress
export const getUserCourses = async () => {
  const response = await fetch(`${API_URL}/courses/user_courses`);
  const data = await response.json();
  return data;
};

// Function to add a new course
export const addCourse = async (courseData) => {
  const response = await fetch(`${API_URL}/courses/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });
  const data = await response.json();
  return data;
};

// Function to get details of a single course
export const getCourseDetail = async (courseId) => {
  const response = await fetch(`${API_URL}/courses/${courseId}`);
  const data = await response.json();
  return data;
};
