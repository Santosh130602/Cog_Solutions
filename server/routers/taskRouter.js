const express = require('express');
const router = express.Router();
const { getTasks, addTask, deleteTask, completeTask, updateTask, reviseTask } = require('../controllers/taskController');


router.get('/tasks-get', getTasks);

router.post('/tasks-add', addTask);

router.delete('/tasks-delete/:id', deleteTask);

router.patch('/tasks-revise/:id/revise', reviseTask);

router.patch('/tasks-complete/:id/complete', completeTask);

router.patch('/tasks-update/:id', updateTask);  

module.exports = router;
