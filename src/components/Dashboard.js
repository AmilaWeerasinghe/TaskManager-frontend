// src/components/Dashboard.js
import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import '../App.css';

const Dashboard = ({ tasks, onAdd, onDelete }) => {
  return (
    <div className="dashboard-container">
      <h1>Task Management Dashboard</h1>
      <div className="task-form">
        <TaskForm onSubmit={onAdd} />
      </div>
      <div className="task-list">
        <TaskList tasks={tasks} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default Dashboard;
