"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = require("../controllers/post");
const router = express_1.default.Router();
// POST /post
router.post('/', 
//isLoggedIn,
post_1.uploadPost);
// POST /post/id
router.get('/:id', post_1.getPost);
// DELETE /post/
exports.default = router;
