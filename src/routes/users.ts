import { Router } from "express";
import {
  getUsers,
  getUser,
  refrashUser,
  refrashAvatar,
  getInfo,
} from "../controllers/users";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getInfo);
userRouter.get("/:userId", getUser);
userRouter.patch("/me", refrashUser);
userRouter.patch("/me/avatar", refrashAvatar);

export default userRouter;
