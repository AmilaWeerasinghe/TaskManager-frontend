// src/components/Dashboard.js
import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Dashboard = ({ tasks, onAdd, onDelete }) => {
  return (
    <div>
      <h1>Task Management Dashboard</h1>
      <TaskForm onSubmit={onAdd} />
      <TaskList tasks={tasks} onDelete={onDelete} />
    </div>
  );
};

export default Dashboard;
