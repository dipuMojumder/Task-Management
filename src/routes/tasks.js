const express = require('express');
const router = express.Router();

// Sample tasks
// Add this at the top, after `const router = express.Router();`
router.get('/', (req, res) => {
  res.json({ message: "Welcome to Task Management API" });
});

let tasks = [
  { id: 1, title: "Task 1", completed: false, priority: "low", createdAt: new Date() },
  { id: 2, title: "Task 2", completed: true, priority: "medium", createdAt: new Date() },
  { id: 3, title: "Task 3", completed: false, priority: "high", createdAt: new Date() },
  { id: 4, title: "Task 4", completed: true, priority: "low", createdAt: new Date() },
  { id: 5, title: "Task 5", completed: false, priority: "medium", createdAt: new Date() },
];

// GET /tasks - return all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /task/:id - return task by ID with error handling
router.get('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(task);
});

// GET /health - server status
router.get('/health', (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime()
  });
});


module.exports = router;
