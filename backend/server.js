import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import studentRoutes from './src/routes/studentRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import { getDepartments } from './src/controllers/adminController.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);

// Public route to map departments
app.get('/api/departments', getDepartments);

app.get('/', (req, res) => {
  res.send('College Admission System API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
