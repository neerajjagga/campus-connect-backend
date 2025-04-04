import express from 'express';
import { getMessages } from '../controllers/message.controller.js';
import { checkAuth } from './../middlewares/user.middleware.js';

const messageRouter = express.Router();

messageRouter.get('/', checkAuth, getMessages);

export default messageRouter

