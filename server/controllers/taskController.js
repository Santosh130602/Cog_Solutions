
const Task = require('../models/task.model');

// Get tasks categorized by DSA topics
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    // Categorizing tasks by DSA topic
    const categorizedTasks = {};

    tasks.forEach((task) => {
      if (!categorizedTasks[task.dsaTopic]) {
        categorizedTasks[task.dsaTopic] = [];
      }
      categorizedTasks[task.dsaTopic].push(task);
    });

    res.json(categorizedTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new task with DSA topic and problem link
const addTask = async (req, res) => {
  try {
    const { title, dsaTopic, problemLink, note = '' } = req.body;

    if (!dsaTopic) {
      return res.status(400).json({ error: "DSA topic is required" });
    }

    const task = new Task({ title, dsaTopic, problemLink, note });
    await task.save();

    res.status(201).json({
      message: "New DSA problem added successfully!",
      task,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reviseTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    // Toggle the `repeaded` field
    task.repeaded = !task.repeaded;
    await task.save();

    res.status(200).json({
      message: `Task marked as ${task.repeaded ? "repeated" : "not repeated"}`,
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const completeTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    // Toggle the `completed` field
    task.completed = !task.completed;
    await task.save();

    res.status(200).json({
      message: `Task marked as ${task.completed ? "completed" : "not completed"}`,
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Mark a task as completed
// const completeTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(
//       req.params.id,
//       { completed: true },
//       { new: true }
//     );
//     if (!task) {
//       return res.status(404).json({ message: "Task not found!" });
//     }
//     res.status(200).json({
//       message: "Task marked as completed!",
//       task,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Update a task (title, topic, problem link, note)
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
  reviseTask 
};
