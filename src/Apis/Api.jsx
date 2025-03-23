import axios from 'axios';

const API_BASE = 'https://cog-solutions-1.onrender.com/api';
// const API_BASE = 'https://cog-solutions.onrender.comconst/api';
// const API_BASE = 'http://localhost:4000/api';

export const getTasks = async () => await axios.get(`${API_BASE}/tasks-get`);

export const addTask = async (task) => await axios.post(`${API_BASE}/tasks-add`, task);

export const deleteTask = async (id) => await axios.delete(`${API_BASE}/tasks-delete/${id}`);

export const updateTask = async (id, task) =>
  await axios.patch(`${API_BASE}/tasks-update/${id}`, task);

export const completeTask = async (id) =>
  await axios.patch(`${API_BASE}/tasks-complete/${id}/complete`);


export const reviseTask = async (id) =>
  await axios.patch(`${API_BASE}/tasks-revise/${id}/revise`);