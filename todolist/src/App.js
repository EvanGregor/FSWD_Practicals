import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateTask = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask('');
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    if (editIndex === index) {
      setEditIndex(null);
      setTask('');
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setTask(spokenText);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };
  };

  return (
    <div className="app">
      <h1>Get Things Done!</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddOrUpdateTask}>
          {editIndex !== null ? 'Update' : 'Add Task'}
        </button>
        <button className="mic-button" onClick={startListening}>🎤</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add one!</p>
        ) : (
          tasks.map((t, index) => (
            <div className="task" key={index}>
              <span>{t}</span>
              <div className="actions">
                <button className="edit" onClick={() => handleEdit(index)}>✏️</button>
                <button className="delete" onClick={() => handleDelete(index)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
