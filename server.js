const express = require("express");
const taskRouter = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/task", taskRouter);  // handles /task/:id
app.use("/tasks", taskRouter); // handles /tasks


// 5 tasks from Assignment 1
app.locals.tasks = [
  { id: 1, title: "Sample Task 1", completed: false, priority: "low", createdAt: new Date() },
  { id: 2, title: "Complete Lab Work", completed: false, priority: "high", createdAt: new Date() },
  { id: 3, title: "Study OS Chapter 2", completed: true, priority: "medium", createdAt: new Date() },
  { id: 4, title: "Buy Groceries", completed: false, priority: "low", createdAt: new Date() },
  { id: 5, title: "Practice Coding", completed: false, priority: "high", createdAt: new Date() }
];

// Assignment 2: Health route
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime()
  });
});

// Mount tasks router
app.use("/tasks", taskRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
