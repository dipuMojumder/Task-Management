const express = require('express');
const app = express();
const port = 3000;

// ✅ Import routes
const taskRoutes = require('./routes/tasks');

// Root route
app.get('/', (req, res) => {
  res.send('Task Management API is running!');
});

// ✅ Use tasks routes
// /tasks → all tasks
// /task/:id → single task
app.use('/tasks', taskRoutes);

// ✅ Health route
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime()
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
