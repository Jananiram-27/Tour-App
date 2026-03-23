import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // <-- New Guest (CORS)
import tourRoute from './routes/tours.js';
import authRoute from './routes/auth.js';
import chatRoute from './routes/chat.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Middleware (Idhu dhaan Frontend-ai allow pannum)
app.use(express.json());
app.use(cors()); 

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

// Routes
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/chat', chatRoute);

app.listen(port, () => {
    connect();
    console.log('Server is running on port', port);
});