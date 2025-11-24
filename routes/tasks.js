const logger = require('../utils/logger');

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ------------------------------------------
// GET all tasks
// ------------------------------------------
// GET tasks with pagination
// GET all tasks with optional search
// GET all tasks (exclude soft-deleted)
router.get('/', async (req, res) => {
    try {
        const search = req.query.q;  // keep search feature

        let sql = "SELECT * FROM tasks WHERE deleted_at IS NULL";
        let params = [];

        if (search) {
            sql += " AND LOWER(title) LIKE ?";
            params.push(`%${search.toLowerCase()}%`);
        }

        sql += " ORDER BY created_at DESC";

        const [rows] = await db.query(sql, params);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});



// ------------------------------------------
// POST create new task
// ------------------------------------------
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
        const [result] = await db.query(sql, [title, description || null]);

        const [newTask] = await db.query(
            'SELECT * FROM tasks WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json(newTask[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// ------------------------------------------
// PUT update task
// ------------------------------------------
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
        const updates = [];
        const values = [];

        if (title !== undefined) {
            updates.push('title = ?');
            values.push(title);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (status !== undefined) {
            updates.push('status = ?');
            values.push(status);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        values.push(id);

        // FIXED LINE — backticks added
        const sql = `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`;

        const [result] = await db.query(sql, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const [updated] = await db.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        );

        res.json(updated[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// ------------------------------------------
// DELETE task
// ------------------------------------------
// SOFT DELETE task
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = "UPDATE tasks SET deleted_at = NOW() WHERE id = ?";
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task soft-deleted successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to soft delete task' });
    }
});
// GET only soft-deleted tasks
router.get('/deleted', async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM tasks WHERE deleted_at IS NOT NULL ORDER BY deleted_at DESC"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// RESTORE soft-deleted task
router.put('/:id/restore', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = "UPDATE tasks SET deleted_at = NULL WHERE id = ?";
        const [result] = await db.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found or not deleted' });
        }

        res.json({ message: 'Task restored successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to restore task' });
    }
});

module.exports = router;
