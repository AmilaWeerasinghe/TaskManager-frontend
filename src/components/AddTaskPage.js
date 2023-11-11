// src/components/AddTaskPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';

const AddTaskPage = ({ onAdd }) => {
  return (
    <div className="page-container">
      <h2>Add Task</h2>
      <TaskForm onSubmit={onAdd} />
      <Link to="/" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default AddTaskPage;
