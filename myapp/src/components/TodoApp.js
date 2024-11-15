import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!newTask.trim()) {
      alert('Please enter a task.');
      return;
    }

    if (tasks.find(task => task.text.toLowerCase() === newTask.toLowerCase())) {
      alert('Task already exists!');
      return;
    }

    const updatedTasks = [...tasks, { text: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask('');
  };

  const deleteTask = index => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleComplete = index => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = index => {
    setEditIndex(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    if (!newTask.trim()) {
      alert('Please enter a task.');
      return;
    }
    if (
      tasks.find(
        (task, i) =>
          task.text.toLowerCase() === newTask.toLowerCase() && i !== editIndex
      )
    ) {
      alert('Task already exists!');
      return;
    }

    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setEditIndex(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">To-Do List</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button
          className="btn btn-success"
          onClick={editIndex !== null ? updateTask : addTask}
        >
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              task.completed ? 'completed' : ''
            }`}
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
                className="form-check-input me-2"
              />
              {task.text}
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editTask(index)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
