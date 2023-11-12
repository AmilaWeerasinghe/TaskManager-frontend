import React from 'react';
import { List, ListItem, ListItemText, Button, Typography, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <div>
      <Typography variant="h6">Task List</Typography>
      <Divider />
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disablePadding>
            <ListItemText primary={task.title} secondary={`Status: ${task.status}`} />
            <IconButton color="error" onClick={() => onDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TaskList;
