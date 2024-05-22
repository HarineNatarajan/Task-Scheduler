const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');

// Sample database of tasks
let tasks = [];
app.use(express.json());
app.use(cors());
// Get all  tasks
app.get('/tasks', (req, res) => {
  res.send(tasks);
});

// Get a specific tasks by ID
app.get('/tasks/:id', (req, res) => {
  const postId = req.params.id;
  const post = tasks.find(post => post.id === postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, date, time } = req.body;
  const newTask = { id: Date.now().toString(), title, date, time, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing tasks
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, date, time } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], title, date, time };
  res.json(tasks[taskIndex]);
});

// Mark a task as complete
app.put('/tasks/:id/complete', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex].completed = true;
  res.json(tasks[taskIndex]);
});

// Delete an existing tasks
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
