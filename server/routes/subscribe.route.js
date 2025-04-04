import express from 'express';
const subscribeRouter = express.Router();

import { subscribeEmail } from '../controllers/subscribe.controller.js';

subscribeRouter.post('/', subscribeEmail);

export default subscribeRouter 