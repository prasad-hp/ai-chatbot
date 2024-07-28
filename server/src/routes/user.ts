import { Router } from "express";
import { getAllUsers, signUpUser } from "../controllers/user";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUpUser)

export default userRouter;
