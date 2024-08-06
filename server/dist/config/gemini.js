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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = run;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
function run(inputRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatSession = model.startChat({ generationConfig });
        const result = yield chatSession.sendMessage(inputRequest);
        return result;
    });
}
