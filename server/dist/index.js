"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const connection_1 = require("./db/connection");
const routes_1 = __importDefault(require("./routes"));
(0, dotenv_1.config)();
const PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/", routes_1.default);
(0, connection_1.connectDataBase)()
    .then(() => {
    app.listen(PORT, () => console.log(`Port is running successfully at port ${PORT}`));
})
    .catch((err) => console.log(err));
