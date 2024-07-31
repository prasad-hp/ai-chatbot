import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import mainMouter from "./routes";
config();
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/", mainMouter);

export default app;
