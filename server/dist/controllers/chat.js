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
exports.receiveChat = exports.sendMessage = void 0;
const gemini_1 = __importDefault(require("../config/gemini"));
const user_1 = require("../models/user");
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = req.body.message;
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const user = yield user_1.User.findById(userId);
        const guest = yield user_1.Guest.findById(userId);
        if (!user || !guest) {
            return res.status(404).json({ message: "User/Guest not found" });
        }
        const result = yield (0, gemini_1.default)(question);
        const responseText = result.response.text();
        if (!user) {
            guest.chats.push({
                request: question,
                response: responseText
            });
            yield guest.save();
        }
        user.chats.push({
            request: question,
            response: responseText
        });
        yield user.save();
        res.status(201).json({ response: responseText });
    }
    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred, please try again." });
    }
});
exports.sendMessage = sendMessage;
const receiveChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }
        const user = yield user_1.User.findById(userId);
        const guest = yield user_1.Guest.findById(userId);
        if (!user || !guest) {
            return res.status(403).json({ message: "User Not found" });
        }
        const chats = user.chats || guest.chats || [];
        res.status(200).json(chats);
    }
    catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ message: "An error occurred, please try again." });
    }
});
exports.receiveChat = receiveChat;
