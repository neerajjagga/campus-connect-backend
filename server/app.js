import express from 'express';
import { createServer } from 'node:http';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

import { initializeSocket } from './lib/socket.js';

import { connectDB } from './config/db.js';
import eventRouter from './routes/event.route.js';
import userRouter from './routes/user.route.js';
import subscribeRouter from './routes/subscribe.route.js';
import clubRouter from './routes/club.route.js';
import messageRouter from './routes/message.route.js';

const app = express();
const server = createServer(app);

app.use(express.json({
    limit: "5MB"
}));
app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

const PORT = process.env.PORT || 3000;

app.use('/api/events', eventRouter);
app.use('/api/auth', userRouter);
app.use('/api/subscribe', subscribeRouter);
app.use('/api/clubs', clubRouter);
app.use('/api/messages', messageRouter);

connectDB().then(() => {
    server.listen(PORT, async () => {
        console.log(`Server started successfully on PORT : ${PORT}`);
        initializeSocket(server);
    })
});