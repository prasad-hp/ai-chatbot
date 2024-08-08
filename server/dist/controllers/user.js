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
exports.loginUser = exports.signUpUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validators_1 = require("../utils/validators");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const JWT_TOKEN = process.env.JWT_TOKEN;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find();
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
        const checkEmail = yield user_1.User.findOne({
            email: signupData.data.email
        });
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = bcrypt_1.default.genSaltSync(10);
        const hashedPassword = yield bcrypt_1.default.hash(signupData.data.password, salt);
        const createUser = yield user_1.User.create({
            firstName: signupData.data.firstName,
            lastName: signupData.data.lastName,
            email: signupData.data.email,
            password: hashedPassword
        });
        if (!createUser) {
            return res.status(500).json({ message: "An error Occured, please try again" });
        }
        const token = (0, jsonwebtoken_1.sign)(createUser.id, JWT_TOKEN);
        res.status(201).json({
            message: "User Created Successfully",
            token: token
        });
    }
    catch (error) {
        console.error(error, "An Error Occured");
    }
});
exports.signUpUser = signUpUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = validators_1.loginSchema.safeParse(req.body);
        if (!loginData.success) {
            return res.status(400).json({ message: loginData.error });
        }
        const user = yield user_1.User.findOne({
            email: loginData.data.email
        });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }
        const checkPassword = bcrypt_1.default.compareSync(loginData.data.password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Enter valid Password" });
        }
        const token = (0, jsonwebtoken_1.sign)(user.id, JWT_TOKEN);
        res.status(200).json({
            message: "Logged In",
            token: token
        });
    }
    catch (error) {
        console.error(error, "An Error Occured");
    }
});
exports.loginUser = loginUser;
