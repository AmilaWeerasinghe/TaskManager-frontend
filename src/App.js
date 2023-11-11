// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTaskPage from './components/AddTaskPage';
import TaskListPage from './components/TaskListPage';
import EditTaskPage from './components/EditTaskPage';
import './App.css';

const Home = () => {
  return (
    <div className="app-container">
      <h1>Task Management Dashboard</h1>

      {/* Render buttons for Add Task and Task List */}
      <div className="nav-tiles">
        <Link to="/add-task">Add Task</Link>
        <Link to="/task-list">Task List</Link>
        <Link to="/edit-task">Edit Task</Link>
      </div>
    </div>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetch('http://localhost:5001/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:5001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error('Error adding task');
      }

      // Refresh the tasks after adding a new task
      const updatedTasks = await response.json();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5001/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting task');
      }

      // Refresh the tasks after deleting a task
      const updatedTasks = await response.json();
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTaskPage onAdd={handleAddTask} />} />
        <Route path="/task-list" element={<TaskListPage tasks={tasks} onDelete={handleDeleteTask}/>} />
        <Route path="/edit-task" element={<EditTaskPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
