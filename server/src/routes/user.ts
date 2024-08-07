import { Router } from "express";
import { getAllUsers, loginUser, signUpUser } from "../controllers/user";
import { guestUser } from "../controllers/guest";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", signUpUser)
userRouter.post("/login", loginUser)
userRouter.post("/guest", guestUser)


export default userRouter;
