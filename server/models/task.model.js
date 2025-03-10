const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  note: { type: String, default: '' }, 
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
