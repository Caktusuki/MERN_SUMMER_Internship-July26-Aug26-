const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`\n⚠️  MongoDB connection FAILED: ${err.message}`);
    console.error('   Check your MONGO_URI and Atlas IP whitelist.\n');
    throw err;
  }
};

module.exports = connectDB;
