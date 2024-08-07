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
const token_manager_1 = require("../utils/token-manager");
const constants_1 = require("../utils/constants");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.clearCookie(constants_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });
        const token = (0, token_manager_1.createToken)(createUser.id, createUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        res.status(201).json({ message: "User Created Successfully" });
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
        res.clearCookie(constants_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true
        });
        const token = (0, token_manager_1.createToken)(user.id, user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        });
        res.status(200).json({ message: "Logged In" });
    }
    catch (error) {
        console.error(error, "An Error Occured");
    }
});
exports.loginUser = loginUser;
