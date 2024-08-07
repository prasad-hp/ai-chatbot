import { Router } from "express";
import { receiveChat, sendMessage } from "../controllers/chat";

const chatRouter = Router()

chatRouter.post("/send", sendMessage)
chatRouter.get("/receive", receiveChat)


export default chatRouter;