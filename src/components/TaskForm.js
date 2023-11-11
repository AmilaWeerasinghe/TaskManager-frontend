// src/components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleTaskChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') {
      // You might want to handle empty task submission
      return;
    }

    // Call the onSubmit function with the new task
    onSubmit({ title });

    // Clear the input field
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={handleTaskChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
