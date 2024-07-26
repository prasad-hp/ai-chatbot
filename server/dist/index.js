"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const connection_1 = require("./db/connection");
const app_1 = __importDefault(require("./app"));
(0, dotenv_1.config)();
const PORT = process.env.PORT;
app_1.default.get("/", (req, res) => {
    res.send("hello");
});
(0, connection_1.connectDataBase)()
    .then(() => {
    app_1.default.listen(PORT, () => console.log(`Port is running successfully at port ${PORT}`));
})
    .catch((err) => console.log(err));
