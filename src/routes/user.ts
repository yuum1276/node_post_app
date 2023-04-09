import express from 'express';

import { isLoggedIn, isNotLoggedIn } from '../middlewares';
import { join, login, logout } from '../controllers/user';

const router = express.Router();

// POST /user/join
router.post('/join', isNotLoggedIn, join);

// POST /user/login
router.post('/login', isNotLoggedIn, login);

// GET /user/logout
router.get('/logout', isLoggedIn, logout);

// POST /user/:id
router.post('/:id', isLoggedIn);

export default router;
