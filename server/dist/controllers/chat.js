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
exports.chat = void 0;
const gemini_1 = __importDefault(require("../config/gemini"));
const chat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inputData = req.body;
        const question = inputData.message;
        const result = yield (0, gemini_1.default)(question);
        console.log(result);
        res.status(201).json(result.response.text());
    }
    catch (error) {
        console.error(error, "An Error Occured");
    }
});
exports.chat = chat;
