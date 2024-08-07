"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.guestSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importStar(require("zod"));
exports.signupSchema = zod_1.default.object({
    firstName: zod_1.default.string(),
    lastName: zod_1.default.string().optional(),
    email: zod_1.default.string().email({ message: "Invalid email address" }),
    password: (0, zod_1.string)().min(6, { message: "Password must be 6 or more characters long" })
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Invalid email address" }),
    password: (0, zod_1.string)().min(6, { message: "Password must be 6 or more characters long" })
});
exports.guestSchema = zod_1.default.string({ message: "Enter valid Name" });
