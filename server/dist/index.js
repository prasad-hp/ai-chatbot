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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const connection_1 = require("./db/connection");
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
(0, dotenv_1.config)();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("hello");
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.body;
    console.log(firstName, lastName);
    res.status(200).json({ message: "Successfull" });
}));
app.use("/api/v1/", routes_1.default);
(0, connection_1.connectDataBase)()
    .then(() => {
    app.listen(PORT, () => console.log(`Port is running successfully at port ${PORT}`));
})
    .catch((err) => console.log(err));
