"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = require("../controllers/chat");
const middleware_1 = require("../utils/middleware");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/send", middleware_1.authMiddleware, chat_1.sendMessage);
chatRouter.get("/receive", middleware_1.authMiddleware, chat_1.receiveChat);
exports.default = chatRouter;
