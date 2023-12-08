
import React from 'react';
import TaskList from './taskList';

const TaskHistory = ({ history, selectedDate }) => {
  const tasksForDate = history[selectedDate] || [];

  return (
    <div>
      <h2>Task History</h2>
      <h3>{selectedDate}</h3>
      <TaskList tasks={tasksForDate} />
    </div>
  );
};

export default TaskHistory;
