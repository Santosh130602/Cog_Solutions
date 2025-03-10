
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');  

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully`.green.underline.bold);
  } catch (error) {
    console.error(`MongoDB connection failed:`.red.underline.bold, error.message.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
