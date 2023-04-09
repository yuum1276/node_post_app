"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
// POST /user/join
router.post('/join', middlewares_1.isNotLoggedIn, user_1.join);
// POST /user/login
router.post('/login', middlewares_1.isNotLoggedIn, user_1.login);
// GET /user/logout
router.get('/logout', middlewares_1.isLoggedIn, user_1.logout);
// POST /user/:id
router.post('/:id', middlewares_1.isLoggedIn);
exports.default = router;
