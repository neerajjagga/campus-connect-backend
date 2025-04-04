import express from 'express';
import { createClub, getSingleClub, addAdminToClub, deleteClub, followClub, unfollowClub, getClubs } from '../controllers/club.controller.js';
import { checkAuth, checkIsAdmin } from './../middlewares/user.middleware.js';

const clubRouter = express.Router();

clubRouter.get('/', checkAuth, getClubs); // get clubs
clubRouter.post('/', checkAuth, checkIsAdmin, createClub); // create club
clubRouter.get('/:clubId', checkAuth, getSingleClub); // get single club
clubRouter.post('/:clubId/add/:adminId', checkAuth, checkIsAdmin,  addAdminToClub); // add admin to club
clubRouter.delete('/:clubId', checkAuth, checkIsAdmin, deleteClub); // delete club

clubRouter.post('/:clubId/follow', checkAuth, followClub); // follow club 
clubRouter.post('/:clubId/unfollow', checkAuth, unfollowClub); // unfollow club

export default clubRouter 