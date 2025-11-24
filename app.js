const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send("Task API running...");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
