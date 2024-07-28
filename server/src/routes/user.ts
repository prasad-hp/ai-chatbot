import { Router } from "express";
import { getAllUsers, loginUser, signUpUser } from "../controllers/user";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUpUser)
userRouter.post("/login", loginUser)


export default userRouter;
