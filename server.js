const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const usersRoutes = require('./routes/users.routes');
const commentRoutes = require('./routes/comment.routes');
const { authenticateToken } = require('./middleware/auth.middleware');
dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_2],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, usersRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/comments', authenticateToken, commentRoutes);

// Error handling middleware
// this will envoke when none of routes will hit.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});