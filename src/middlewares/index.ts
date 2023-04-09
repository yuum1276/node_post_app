import { RequestHandler } from 'express';

const isLoggedIn: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('222로그인 해주세용');
  }
};

const isNotLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니당');
    res.send(message);
  }
};
export { isLoggedIn, isNotLoggedIn };
