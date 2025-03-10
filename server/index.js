// index.js
const express = require('express');
const cors = require('cors');
const colors = require('colors'); 
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const taskRoutes = require('./routers/taskRouter');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`.green.underline.bold));

