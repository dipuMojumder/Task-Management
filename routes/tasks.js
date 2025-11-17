const express = require("express");
const router = express.Router();

// GET /tasks → Return all 5 tasks
router.get("/", (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({
    success: true,
    data: tasks
  });
});

module.exports = router;
