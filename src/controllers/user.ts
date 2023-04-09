import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/user';
import { RequestHandler } from 'express'; // req, res, next에 대한 타입

const join: RequestHandler = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      res.send('사용중인 이멜입니당');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    res.send(`${nick}님 환영합니당`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const login: RequestHandler = (req, res, next) => {
  passport.authenticate('local', (authError, user) => {
    if (authError) {
      console.error(authError);
      next(authError);
    }
    // 로그인 성공시 login 함수 호출
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        next(loginError);
      }
      const session = req.session;
      console.log(req.session);
      session.save(() => {
        session.email = req.body.email;
        console.log(session.email);
        res.send('로그인 성공!');
      });
    });
  })(req, res, next);
};

const logout: RequestHandler = (req, res) => {
  req.session.destroy(() => {
    req.logout(() => {
      res.send('111로그아웃 성공!');
    });
  });
  //  req.logout(() => {
  //  req.session.destroy(() => {
  //    res.send('111로그아웃 성공!');
  //   });
  // });
};

export { login, join, logout };
