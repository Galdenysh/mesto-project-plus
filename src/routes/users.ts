import { Router } from "express";
import {
  getUsers,
  getUser,
  refrashUser,
  refrashAvatar,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:userId", getUser);
userRouter.patch("/me", refrashUser);
userRouter.patch("/me/avatar", refrashAvatar);

export default userRouter;
