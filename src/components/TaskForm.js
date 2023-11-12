// TaskForm.js
import React, { useState } from 'react';
import './styles/TaskForm.css'; // Import the CSS file for styling

const TaskForm = ({ initialTask, onSubmit }) => {
  const [task, setTask] = useState(initialTask || { title: '', priority: 'Low', status: 'inProgress', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={task?.title || ''}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={task?.description || ''}
          onChange={handleChange}
          required
          className="form-control"
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority:</label>
        <select id="priority" name="priority" value={task?.priority || ''} onChange={handleChange} required className="form-control">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={task?.status || ''} onChange={handleChange} required className="form-control">
          <option value="todo">To-Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <button type="submit" className="btn-submit">
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
