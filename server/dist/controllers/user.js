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
exports.signUpUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../utils/validators");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllUsers = getAllUsers;
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signupData = validators_1.signupSchema.safeParse(req.body);
        if (!signupData.success) {
            return res.status(400).json({ message: signupData.error });
        }
        const checkEmail = yield user_1.default.findOne({
            email: signupData.data.email
        });
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = yield bcrypt_1.default.hash(signupData.data.password, salt);
        yield user_1.default.create({
            firstName: signupData.data.firstName,
            lastName: signupData.data.lastName,
            email: signupData.data.email,
            password: hashedPassword
        });
        res.status(201).json({ message: "User Created Successfully" });
    }
    catch (error) {
        console.error(error, "An Error Occured");
    }
});
exports.signUpUser = signUpUser;
