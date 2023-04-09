"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.join = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const join = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nick, password } = req.body;
    try {
        const exUser = yield user_1.default.findOne({ where: { email } });
        if (exUser) {
            res.send('사용중인 이멜입니당');
        }
        const hash = yield bcrypt_1.default.hash(password, 12);
        yield user_1.default.create({
            email,
            nick,
            password: hash,
        });
        res.send(`${nick}님 환영합니당`);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.join = join;
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (authError, user) => {
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
exports.login = login;
const logout = (req, res) => {
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
exports.logout = logout;
