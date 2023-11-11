// src/components/TaskListPage.js
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import { Link } from 'react-router-dom';

const TaskListPage = ({ onDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <TaskList tasks={tasks} onDelete={onDelete} />
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
};

export default TaskListPage;
