
import React, { useState } from 'react';

const TaskForm = ({ onAdd, history, onDateChange }) => {
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onAdd({ id: Date.now(), text, date: selectedDate });
      setText('');
      // Update the history for the selected date
      const updatedHistory = { ...history, [selectedDate]: [...(history[selectedDate] || []), { text }] };
      onDateChange(selectedDate, updatedHistory);
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate, history); // You may need to pass the current history here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Add a task"
          value={text}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
