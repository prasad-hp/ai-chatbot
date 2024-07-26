import { Router } from "express";
import { getAllUsers } from "../controllers/user";

const userRouter = Router();
userRouter.get("/", getAllUsers);

export default userRouter;
