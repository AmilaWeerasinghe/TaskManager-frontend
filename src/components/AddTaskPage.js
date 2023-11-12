import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import { Typography, Button, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import './styles/AddTaskPage.css'; 

const AddTaskPage = ({ onAdd }) => {
  const [responseBanner, setResponseBanner] = useState(null);

  const handleAddTask = async (newTask) => {
    try {
      await onAdd(newTask);

      // Show success banner
      setResponseBanner({ type: 'success', message: 'Task added successfully' });

    } catch (error) {
      console.error('Error adding task:', error);
      // Show error banner
      setResponseBanner({ type: 'error', message: 'Error adding task' });
    }
  };

  const handleBannerClose = () => {
    setResponseBanner(null);
  };

  return (
    <div className="page-container">
      <Typography variant="h4">Add Task</Typography>

      <Snackbar
        open={responseBanner !== null}
        autoHideDuration={6000}
        onClose={handleBannerClose}
        message={responseBanner?.message}
        action={
          <Button color="inherit" size="small" onClick={handleBannerClose}>
            <CloseIcon fontSize="small" />
          </Button>
        }
      />

      <TaskForm onSubmit={handleAddTask} />

      <Button component={Link} to="/" variant="outlined" color="primary" className="back-link">
        Back to Dashboard
      </Button>
    </div>
  );
};

export default AddTaskPage;
