import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getCards,
  createCard,
  deleteCard,
  enableLike,
  disableLike,
} from "../controllers/cards";
import { createCardScheme } from "../utils/scheme";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", celebrate(createCardScheme), createCard);
cardRouter.delete("/:cardId", deleteCard);
cardRouter.put("/:cardId/likes", enableLike);
cardRouter.delete("/:cardId/likes", disableLike);

export default cardRouter;
