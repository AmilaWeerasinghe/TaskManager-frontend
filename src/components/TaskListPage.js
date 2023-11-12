import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, Divider, Button, Box } from '@mui/material';

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
      <Typography variant="h4">Task List</Typography>
      <Divider />

      {/* Display tasks using Material-UI Card components */}
      <div className="task-list">
        {tasks.map((task) => (
          <Card key={task.id} variant="outlined" className="task-card">
            <CardContent>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body1">Description: {task.description}</Typography>
              <Typography variant="body2">Priority: {task.priority}</Typography>
              <Typography variant="body2">Status: {task.status}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
      <Box mt={2}>
        <Button component={Link} to="/" variant="outlined" color="primary">
          Back to Dashboard
        </Button>
      </Box>
    </div>
  );
};

export default TaskListPage;
