// src/components/AddTaskPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import './styles/AddTaskPage.css'; // Import the CSS file for styling

const AddTaskPage = ({ onAdd }) => {
  const [responseBanner, setResponseBanner] = useState(null);

  const handleAddTask = async (newTask) => {
    try {
      // Call the onAdd function passed as a prop
      await onAdd(newTask);

      // Show success banner
      setResponseBanner({ type: 'success', message: 'Task added successfully' });

    } catch (error) {
      console.error('Error adding task:', error);
      // Show error banner
      setResponseBanner({ type: 'error', message: 'Error adding task' });
    }
  };

  const handleBannerClose = () => {
    setResponseBanner(null);
  };

  return (
    <div className="page-container">
      <h2>Add Task</h2>

      {/* Display response banner */}
      {responseBanner && (
        <div className={`response-banner ${responseBanner.type}`}>
          <p>{responseBanner.message}</p>
          <button onClick={handleBannerClose}>&times;</button>
        </div>
      )}

      {/* Task form */}
      <TaskForm onSubmit={handleAddTask} />

      {/* Back to Dashboard link */}
      <Link to="/" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default AddTaskPage;
