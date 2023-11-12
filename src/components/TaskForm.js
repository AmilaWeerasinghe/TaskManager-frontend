import React, { useState } from 'react';
import { TextField, TextareaAutosize, Select, MenuItem, Button, FormControl, InputLabel, Container, Grid } from '@mui/material';
import './styles/TaskForm.css'; // Import the CSS file for styling

const TaskForm = ({ initialTask, onSubmit }) => {
  const [task, setTask] = useState(initialTask || { title: '', priority: 'low', status: 'inProgress', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit} className="task-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              id="title"
              name="title"
              value={task?.title || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              fullWidth
              minRows={3}
              placeholder="Description"
              id="description"
              name="description"
              value={task?.description || ''}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="priority">Priority</InputLabel>
              <Select
                label="Priority"
                id="priority"
                name="priority"
                value={task?.priority || 'low'}
                onChange={handleChange}
                required
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel htmlFor="status">Status</InputLabel>
              <Select
                label="Status"
                id="status"
                name="status"
                value={task?.status || ''}
                onChange={handleChange}
                required
              >
                <MenuItem value="todo">To-Do</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskForm;
