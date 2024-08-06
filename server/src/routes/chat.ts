import { Router } from "express";
import { chat } from "../controllers/chat";

const chatRouter = Router()

chatRouter.post("/", chat)

export default chatRouter;