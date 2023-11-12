import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from './TaskForm';
import { Typography, List, ListItem, ListItemText, Paper, Grid, Snackbar, Button } from '@mui/material';
import { Alert } from '@mui/material';

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
      setResponseBanner({ type: 'error', message: `Error updating task: ${error}` });
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

      // Filter out the deleted task from the list
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask.id));
      setResponseBanner({ type: 'success', message: 'Task deleted successfully' });
      setSelectedTask(null);
    } catch (error) {
      console.error('Error deleting task:', error);
      setResponseBanner({ type: 'error', message: `Error deleting task: ${error.message}` });
    }
  };

  const handleBannerClose = () => {
    setResponseBanner(null);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h2">Edit Task</Typography>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={3}>
          <Typography variant="h4">Tasks List</Typography>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} button onClick={() => handleSelectTask(task)}>
                <ListItemText primary={task.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper elevation={3}>
          {selectedTask && (
            <div>
              <Typography variant="h4">Edit Task: {selectedTask.title}</Typography>
              <TaskForm initialTask={selectedTask} onSubmit={handleUpdateTask} />
              <Button variant="contained" color="secondary" onClick={handleDeleteTask}>
                Delete Task
              </Button>
              <Typography>
                Task ID: {selectedTask.id}, Priority: {selectedTask.priority}, Status:{' '}
                {selectedTask.status}
              </Typography>
            </div>
          )}
          {!selectedTask && (
            <Typography variant="body1" color="textSecondary">
              Select a task to edit.
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Link to="/" className="back-link">
          Back to Dashboard
        </Link>
      </Grid>
      <Snackbar
        open={responseBanner !== null}
        autoHideDuration={6000}
        onClose={handleBannerClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleBannerClose} severity={responseBanner?.type}>
          {responseBanner?.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default EditTaskPage;
