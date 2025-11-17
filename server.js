const express = require("express");
const taskRouter = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory database with 5 tasks
app.locals.tasks = [
  { id: 1, title: "Sample Task 1", completed: false, priority: "low", createdAt: new Date() },
  { id: 2, title: "Complete Lab Work", completed: false, priority: "high", createdAt: new Date() },
  { id: 3, title: "Study OS Chapter 2", completed: true, priority: "medium", createdAt: new Date() },
  { id: 4, title: "Buy Groceries", completed: false, priority: "low", createdAt: new Date() },
  { id: 5, title: "Practice Coding", completed: false, priority: "high", createdAt: new Date() }
];

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API running" });
});

// Health route
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime()
  });
});

// Mount router
app.use("/tasks", taskRouter);  // /tasks, /tasks/:id
app.use("/task", taskRouter);   // /task/:id

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
