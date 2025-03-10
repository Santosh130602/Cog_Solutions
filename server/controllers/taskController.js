const Task = require('../models/task.model');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, priority = 'Medium', note = '' } = req.body;  
    const task = new Task({ title, priority, note });
    await task.save();
    res.status(201).json({
      message: "New task added successfully!",
      task,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const completeTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({
      message: "Task marked as completed!",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({
      message: "Task updated successfully!",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  addTask,
  deleteTask,
  completeTask,
  updateTask,  
};
