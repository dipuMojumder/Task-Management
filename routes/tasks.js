const express = require("express");
const router = express.Router();

// GET /tasks → return all tasks
router.get("/", (req, res) => {
  const tasks = req.app.locals.tasks;
  res.json({ success: true, data: tasks });
});

// GET /task/:id → return one task by ID with error handling
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  // INVALID ID FORMAT → 400
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid ID format"
    });
  }

  const tasks = req.app.locals.tasks;
  const task = tasks.find(t => t.id === id);

  // TASK NOT FOUND → 404
  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  // SUCCESS → return task
  return res.status(200).json({
    success: true,
    data: task
  });
});

module.exports = router;
