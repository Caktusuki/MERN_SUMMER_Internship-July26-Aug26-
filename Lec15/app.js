const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (without database)`);
});