import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    fetch('http://localhost:5001/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (newTask) => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the tasks after adding a new task
        fetch('http://localhost:5000/tasks')
          .then((response) => response.json())
          .then((data) => setTasks(data))
          .catch((error) => console.error('Error fetching tasks:', error));
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the tasks after deleting a task
        fetch('http://localhost:5000/tasks')
          .then((response) => response.json())
          .then((data) => setTasks(data))
          .catch((error) => console.error('Error fetching tasks:', error));
      })
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <Dashboard tasks={tasks} onAdd={handleAddTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
