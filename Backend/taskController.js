const Task = require('../models/taskModel');

// Get all tasks
module.exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving tasks.");
  }
};

// Get a specific task by ID
module.exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found.");
    }
    res.send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving the task.");
  }
};

// Save a new task
module.exports.saveTask = async (req, res) => {
  try {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
      return res.status(400).send("All fields (title, date, time) are required.");
    }

    const newTask = await Task.create({ title, date, time });
    console.log("Task added successfully");
    res.send(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while saving the task.");
  }
};

// Update an existing task
module.exports.updateTask = async (req, res) => {
  try {
    const { title, date, time } = req.body;

    if (!title || !date || !time) {
      return res.status(400).send("All fields (title, date, time) are required.");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, date, time }, { new: true });

    if (!updatedTask) {
      return res.status(404).send("Task not found.");
    }

    res.send(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the task.");
  }
};

// Delete a task
module.exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'An error occurred while deleting the task' });
  }
};

// Mark a task as complete
module.exports.completeTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { completed: true }, { new: true });

    if (!updatedTask) {
      return res.status(404).send("Task not found.");
    }

    res.send(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while marking the task as complete.");
  }
};
