import { RequestHandler } from 'express';
import Post from '../models/post';
import User from '../models/user';

const uploadPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      //userId: req.body.id,
      // UserId: req.user?.id,
    });
    res.send(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getPost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id } });
    res.send(post);
  } catch (error) {
    console.error(error);
    res.send('Post not found');
    next(error);
  }
};

const getPostList: RequestHandler = async (req, res, next) => {
  try {
    let where = {};
    const posts = await Post.findAll({
      where,
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      res.status(404).send('Post not found');
    }
    await Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/**router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니당');
    }
    const comments = await Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });
    return res.json(comments);
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니당');
    }
    const newComment = await Comment.create({
      PostId: post.id,
      UserId: req.body.id,
      content: req.body.content,
    });
    // await post.addComment(newComment.id);
    const comment = await Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });
    return res.json(comment);
  } catch (err) {
    console.error(err);
    return next(err);
  }
}); 
 * 
*/

export { uploadPost, getPost, deletePost, getPostList };
