// EditTaskPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import './styles/EditTaskPage.css';

const EditTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [responseBanner, setResponseBanner] = useState(null);

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

  const handleSelectTask = (task) => {
    setSelectedTask(task);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
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

      setResponseBanner({ type: 'success', message: 'Task updated successfully' });
      setSelectedTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      setResponseBanner({ type: 'error', message: 'Error updating task' });
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:5001/tasks/${selectedTask.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting task');
      }

      setResponseBanner({ type: 'success', message: 'Task deleted successfully' });
      setSelectedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setResponseBanner({ type: 'error', message: 'Error deleting task' });
    }
  };

  const handleBannerClose = () => {
    setResponseBanner(null);
  };

  return (
    <div className="page-container">
      <h2>Edit Task</h2>

      <div className="tasks-list-container">
        <div className="tasks-list">
          {/* Display the list of tasks */}
          <ul>
            {tasks.map((task) => (
              <li key={task.id} onClick={() => handleSelectTask(task)}>
                {task.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="edit-task-form">
          {/* conditional rendering */}
          {selectedTask && (
            <>
              <h3>Edit Task: {selectedTask.title}</h3>
              <TaskForm initialTask={selectedTask} onSubmit={handleUpdateTask} />
              <button onClick={handleDeleteTask} className="delete-task-button">
                Delete Task
              </button>
              <p>
                {/* Display task details for reference */}
                Task ID: {selectedTask.id}, Priority: {selectedTask.priority}, Status: {selectedTask.status}
              </p>
            </>
          )}

          {/* Display a message if no task is selected */}
          {!selectedTask && <p className="select-task-message">Select a task to edit.</p>}

          {/* Response or error banner */}
          {responseBanner && (
            <div className={`response-banner ${responseBanner.type}`}>
              <p>{responseBanner.message}</p>
              <button onClick={handleBannerClose}>&times;</button>
            </div>
          )}
        </div>
      </div>
      <Link to="/" className="back-link">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default EditTaskPage;
