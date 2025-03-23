
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  repeaded: { type: Boolean, default: false },
  dsaTopic: { 
    type: String, 
    enum: [
      'Array', 'String', 'LinkedList', 'Stack', 'Queue', 'Heap', 
      'Graph', 'Tree', 'Binary Tree', 'Binary Search Tree', 
      'Recursion', 'Backtracking', 'Dynamic Programming', 
      'Greedy Algorithm', 'Bit Manipulation', 'Trie', 
      'Segment Tree', 'Fenwick Tree', 'Hashing', 'Sorting', 
      'Searching', 'Graph Algorithms', 'Mathematical', 
      'Divide and Conquer'
    ], 
    required: true 
  },
  problemLink: { type: String, required: true }, 
  note: { type: String, default: '' }, 
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
