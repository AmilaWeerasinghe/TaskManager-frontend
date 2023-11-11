// src/components/EditTaskPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';

const EditTaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Fetch the list of tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Make a GET request to fetch the list of tasks
        const response = await fetch('http://localhost:5001/tasks');
        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        // Assuming the API returns an array of tasks
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleSelectTask = (task) => {
    // Set the selected task when a task is clicked
    setSelectedTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      // Make a PUT request to update the selected task details
      const response = await fetch(`http://localhost:5001/tasks/${selectedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Error updating task');
      }

      // After updating, reset the selected task and navigate back to the list
      setSelectedTask(null);
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="page-container">
      <h2>Edit Task</h2>

      {/* Display the list of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => handleSelectTask(task)}>
            {task.title}
          </li>
        ))}
      </ul>

      {/* Display the task form if a task is selected */}
      {selectedTask && (
        <>
          <h3>Edit Task: {selectedTask.title}</h3>
          <TaskForm initialTask={selectedTask} onSubmit={handleUpdateTask} />
        </>
      )}

      {/* Display a message if no task is selected */}
      {!selectedTask && <p>Select a task to edit.</p>}
    </div>
  );
};

export default EditTaskPage;
