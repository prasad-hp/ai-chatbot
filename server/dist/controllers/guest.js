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
exports.guestUser = void 0;
const validators_1 = require("../utils/validators");
const user_1 = require("../models/user");
const guestUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const guestName = req.body.name;
    const parsedData = validators_1.guestSchema.safeParse(guestName);
    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error });
    }
    try {
        const createGuest = yield user_1.Guest.create({
            firstName: guestName
        });
        if (!createGuest) {
            return res.status(500).json({ message: "Please try again" });
        }
        res.status(201).json({
            message: "User Created Successfully",
            userId: createGuest.id
        });
    }
    catch (error) {
        console.error(error, "An Error Occured");
    }
});
exports.guestUser = guestUser;
