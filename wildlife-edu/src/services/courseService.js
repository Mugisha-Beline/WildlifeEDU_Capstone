import { getCSRFToken } from '../pages/utils/csrf'; // Import CSRF helper function

const updateProgress = (courseId, progress) => {
  fetch(`/courses/update_progress/${courseId}/${progress}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(),  // Include CSRF token if needed
    },
    body: JSON.stringify({ progress }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Progress updated:', data);
      // Optionally, refresh the user courses progress after update
      fetch('/courses/user_courses/')
        .then(response => response.json())
        .then(data => setUserCourses(data.user_courses));
    });
};
