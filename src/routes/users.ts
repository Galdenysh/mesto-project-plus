import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getUsers,
  getUser,
  refrashUser,
  refrashAvatar,
  getInfo,
} from "../controllers/users";
import { refrashAvatarScheme, refrashUserScheme } from "../utils/scheme";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getInfo);
userRouter.get("/:userId", getUser);
userRouter.patch("/me", celebrate(refrashUserScheme), refrashUser);
userRouter.patch("/me/avatar", celebrate(refrashAvatarScheme), refrashAvatar);

export default userRouter;
