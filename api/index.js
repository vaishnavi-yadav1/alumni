import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/alumni.route.js';
import jobRouter from './routes/job.route.js'
import eventRouter from './routes/event.route.js'
import cookieParser  from 'cookie-parser';
import path from 'path';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to db');
}
).catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/job',jobRouter);
app.use('/api/event',eventRouter);

app.use(express.static(path.join(__dirname,'../client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/dist','index.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});