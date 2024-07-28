"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_1.getAllUsers);
userRouter.post("/signup", user_1.signUpUser);
userRouter.post("/login", user_1.loginUser);
exports.default = userRouter;
