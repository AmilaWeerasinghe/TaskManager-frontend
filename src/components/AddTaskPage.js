// src/components/AddTaskPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';

const AddTaskPage = ({ onAdd }) => {
  return (
    <div>
      <h2>Add Task</h2>
      <TaskForm onSubmit={onAdd} />
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default AddTaskPage;
