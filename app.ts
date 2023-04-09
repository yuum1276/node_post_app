import express, { ErrorRequestHandler } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import postRouter from './src/routes/post';
import userRouter from './src/routes/user';
import { sequelize } from './src/models';
import passportConfig from './src/passport';

const app = express();
passportConfig(); // passport 설정
app.set('port', 8000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: 'session ID',
    secret: 'qwer',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
    },
  })
);

// session 확인
//app.use('/', (req, res, next) => {
//  console.log('session info', req.session);
//  res.send('Hi there');
//  next();
//});

app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 없는 페이지지롱`);
  error.status = 404;
  next(error);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send({
    message: 'Server Error',
    error: err,
  });
};
app.use(errorHandler);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'listening....');
});
