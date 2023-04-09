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
exports.getPostList = exports.deletePost = exports.getPost = exports.uploadPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const uploadPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.create({
            title: req.body.title,
            content: req.body.content,
            //userId: req.body.id,
            // UserId: req.user?.id,
        });
        res.send(post);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.uploadPost = uploadPost;
const getPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield post_1.default.findOne({ where: { id } });
        res.send(post);
    }
    catch (error) {
        console.error(error);
        res.send('Post not found');
        next(error);
    }
});
exports.getPost = getPost;
const getPostList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let where = {};
        const posts = yield post_1.default.findAll({
            where,
            include: [
                {
                    model: user_1.default,
                    attributes: ['id', 'nick'],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
        res.json(posts);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.getPostList = getPostList;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.default.findOne({ where: { id: req.params.id } });
        if (!post) {
            res.status(404).send('Post not found');
        }
        yield post_1.default.destroy({ where: { id: req.params.id } });
        res.send(req.params.id);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.deletePost = deletePost;
