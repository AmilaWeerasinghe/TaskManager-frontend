// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddTaskPage from './components/AddTaskPage';
import TaskListPage from './components/TaskListPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Task Management Dashboard</h1>
        <div className="nav-tiles">
          <Link to="/add-task">Add Task</Link>
          <Link to="/task-list">Task List</Link>
        </div>
        <Routes>
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/task-list" element={<TaskListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
