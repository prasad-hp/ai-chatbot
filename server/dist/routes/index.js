"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const chat_1 = __importDefault(require("./chat"));
const mainMouter = (0, express_1.Router)();
mainMouter.use("/user", user_1.default);
mainMouter.use("/chat", chat_1.default);
exports.default = mainMouter;
