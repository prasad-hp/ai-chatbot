"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guest = exports.User = void 0;
const crypto_1 = require("crypto");
const mongoose_1 = __importDefault(require("mongoose"));
const chatSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: (0, crypto_1.randomUUID)()
    },
    request: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    chats: [chatSchema]
});
const guestSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true
    },
    chats: [chatSchema]
});
exports.User = mongoose_1.default.model("User", userSchema);
exports.Guest = mongoose_1.default.model("Guest", guestSchema);
