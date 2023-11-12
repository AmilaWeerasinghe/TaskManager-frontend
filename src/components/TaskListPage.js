// TaskListPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5001/tasks');
        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task List</h2>

      {/* Display tasks in a more organized way */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default TaskListPage;
