"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        // 로그인 시 한번만
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        user_1.default.findOne({
            where: { id },
            include: [
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                },
            ],
        })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    (0, localStrategy_1.default)();
};
