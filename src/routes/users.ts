import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  getUsers,
  getUser,
  refrashUser,
  refrashAvatar,
  getInfo,
} from "../controllers/users";
import { urlPattern } from "../utils/validUrl";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/me", getInfo);
userRouter.get("/:userId", getUser);
userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        about: Joi.string().required().min(2).max(200),
      })
      .unknown(true),
  }),
  refrashUser
);
userRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(urlPattern),
    }),
  }),
  refrashAvatar
);

export default userRouter;
