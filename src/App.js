
import React, { useState } from 'react';
import TaskList from './taskList';
import TaskForm from './taskForm';
import TaskHistory from './taskHistory';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);

    // Initialize the history for the selected date if not present
    const updatedHistory = {
      ...history,
      [selectedDate]: history[selectedDate] ? [...history[selectedDate], newTask] : [newTask],
    };
    setHistory(updatedHistory);
  };

  const deleteTask = (taskId, taskDate) => {
    setTasks(tasks.filter((task) => task.id !== taskId));

    // Check if history for the date is present before filtering
    if (history[taskDate]) {
      const updatedHistory = { ...history, [taskDate]: history[taskDate].filter((task) => task.id !== taskId) };
      setHistory(updatedHistory);
    }
  };

  const updateHistory = (date, updatedHistory) => {
    setSelectedDate(date);
    setHistory(updatedHistory);
  };

  return (
    <div className="App">
      <div className="form-section">
        <h1>Task Tracker</h1>
        <TaskForm onAdd={addTask} history={history} onDateChange={updateHistory} />
        <TaskList tasks={tasks} onDelete={deleteTask} />
      </div>
      <div className="history-section">
        <TaskHistory history={history} selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default App;
