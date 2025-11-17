const express = require("express");
const router = express.Router();

// GET /tasks → return all tasks
router.get("/", (req, res) => {
  const tasks = req.app.locals.tasks;
  res.json({ success: true, data: tasks });
});

// GET /task/:id → return one task by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  // Invalid ID format → Assignment 5
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const tasks = req.app.locals.tasks;
  const task = tasks.find(t => t.id === id);

  // Task not found → return 404
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ success: true, data: task });
});

module.exports = router;
