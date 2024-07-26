import { Router } from "express";
import userRouter from "./user";
import chatRouter from "./chat";

const mainMouter = Router();

mainMouter.use("/user", userRouter )
mainMouter.use("/chat", chatRouter )

export default mainMouter;