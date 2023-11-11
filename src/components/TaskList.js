// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
  console.log('taskList',tasks);
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
