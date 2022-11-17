import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  getCards,
  createCard,
  deleteCard,
  enableLike,
  disableLike,
} from "../controllers/cards";
import { urlPattern } from "../utils/validUrl";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlPattern),
    }),
  }),
  createCard
);
cardRouter.delete("/:cardId", deleteCard);
cardRouter.put("/:cardId/likes", enableLike);
cardRouter.delete("/:cardId/likes", disableLike);

export default cardRouter;
