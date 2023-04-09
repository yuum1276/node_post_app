import express from 'express';

import { getPost, uploadPost } from '../controllers/post';
import { isLoggedIn } from '../middlewares';

const router = express.Router();

// POST /post
router.post(
  '/',
  //isLoggedIn,
  uploadPost
);

// POST /post/id
router.get('/:id', getPost);

// DELETE /post/

export default router;
