import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import autoRouter from './routes/auth.route.js'
dotenv.config();

// Connecting to DB
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to database !! ');
    })
    .catch(
    (err) => {
        console.log(err);
    }
);

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000 !!');
});

app.use('/api/user',userRouter);
app.use('/api/auth',autoRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error!";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
})