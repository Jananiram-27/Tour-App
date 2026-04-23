import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; 
import tourRoute from './routes/tours.js';
import authRoute from './routes/auth.js';
import chatRoute from './routes/chat.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS Options - Ithu thaan Vercel frontend-ah allow pannum
const corsOptions = {
    origin: true, // "true" kudutha entha live URL-la irunthum access tharum
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); 

// Database Connection
mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Database Connected Successfully!');
    } catch (err) {
        console.log('MongoDB Connection Failed:', err);
    }
};

// Basic Test Route (Browser-la check panna help aagum)
app.get('/', (req, res) => {
    res.send('Tour App Backend is Running Successfully!');
});

// Routes
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/chat', chatRoute);

// Server Start
app.listen(port, () => {
    connect();
    console.log('Server is running on port', port);
});