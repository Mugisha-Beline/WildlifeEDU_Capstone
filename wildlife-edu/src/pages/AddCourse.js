// src/components/Courses/AddCourse.js
import React, { useState } from 'react';
import { addCourse } from './utils/api';
import './Home.css';
import './AddCourse.css';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = { title, description, image };
    
    // Call API to add the course
    addCourse(courseData)
      .then(response => {
        console.log('Course added:', response);
        // Optionally redirect or clear the form
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="add-course-page">
      <h1>Add New Course</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Course Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
