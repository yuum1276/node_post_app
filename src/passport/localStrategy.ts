import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../models/user';

export default () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password!);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호를 확인해주세용' });
            }
          } else {
            done(null, false, { message: '회원가입이 필요합니당' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
