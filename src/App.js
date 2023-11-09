import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div>
      <Dashboard tasks={tasks} onAdd={handleAddTask} onDelete={handleDeleteTask} />
    </div>
  );
};

export default App;
