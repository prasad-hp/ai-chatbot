"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_1 = require("../controllers/chat");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/", chat_1.chat);
exports.default = chatRouter;
