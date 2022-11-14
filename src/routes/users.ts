import { Router } from "express";
import {
  getUsers,
  createUser,
  getUser,
  refrashUser,
  refrashAvatar,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.post("/", createUser);
userRouter.patch("/me", refrashUser);
userRouter.patch("/me/avatar", refrashAvatar);

export default userRouter;
