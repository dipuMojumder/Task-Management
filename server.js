const express = require("express");
const taskRouter = require("./routes/tasks");

const app = express();
const PORT = 3000;

app.use(express.json());

// REQUIRED: 5 TASKS (with JS Date objects)
app.locals.tasks = [
  { id: 1, title: "Sample Task 1", completed: false, priority: "low", createdAt: new Date() },
  { id: 2, title: "Complete Lab Work", completed: false, priority: "high", createdAt: new Date() },
  { id: 3, title: "Study OS Chapter 2", completed: true, priority: "medium", createdAt: new Date() },
  { id: 4, title: "Buy Groceries", completed: false, priority: "low", createdAt: new Date() },
  { id: 5, title: "Practice Coding", completed: false, priority: "high", createdAt: new Date() }
];

app.use("/tasks", taskRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
