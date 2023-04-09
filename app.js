"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const post_1 = __importDefault(require("./src/routes/post"));
const user_1 = __importDefault(require("./src/routes/user"));
const models_1 = require("./src/models");
const passport_2 = __importDefault(require("./src/passport"));
const app = (0, express_1.default)();
(0, passport_2.default)(); // passport 설정
app.set('port', 8000);
models_1.sequelize
    .sync({ force: false })
    .then(() => {
    console.log('DB 연결 성공');
})
    .catch((err) => {
    console.error(err);
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    name: 'session ID',
    secret: 'qwer',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
    },
}));
// session 확인
//app.use('/', (req, res, next) => {
//  console.log('session info', req.session);
//  res.send('Hi there');
//  next();
//});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/post', post_1.default);
app.use('/user', user_1.default);
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 없는 페이지지롱`);
    error.status = 404;
    next(error);
});
const errorHandler = (err, req, res, next) => {
    res.status(500).send({
        message: 'Server Error',
        error: err,
    });
};
app.use(errorHandler);
app.listen(app.get('port'), () => {
    console.log(app.get('port'), 'listening....');
});
