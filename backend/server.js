import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidate', candidateRoutes);
app.use('/api/admin', adminRoutes);

// Database Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/zynkr';
        console.log(`Attempting to connect to MongoDB...`);
        
        await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected successfully!`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Log more details if possible
        if (error.reason) console.error(`Reason: ${JSON.stringify(error.reason)}`);
    }
};

// Basic Routes
app.get('/', (req, res) => {
    res.json({ message: 'Zynkr API is running...' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    connectDB();
});
