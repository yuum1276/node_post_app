import passport from 'passport';
import local from './localStrategy';
import User from '../models/user';

export default () => {
  passport.serializeUser((user, done) => {
    // 로그인 시 한번만
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
};
