const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task routes
router.get('/tasks', taskController.getTasks);
router.get('/tasks/:id', taskController.getTaskById); // Route to get a task by ID
router.post('/tasks', taskController.saveTask);
router.put('/tasks/:id', taskController.updateTask);
router.put('/tasks/:id/complete', taskController.completeTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
