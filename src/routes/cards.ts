import { Router } from "express";
import { celebrate } from "celebrate";
import {
  getCards,
  createCard,
  deleteCard,
  enableLike,
  disableLike,
} from "../controllers/cards";
import { cardIdScheme, createCardScheme } from "../utils/scheme";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", celebrate(createCardScheme), createCard);
cardRouter.delete("/:cardId", celebrate(cardIdScheme), deleteCard);
cardRouter.put("/:cardId/likes", celebrate(cardIdScheme), enableLike);
cardRouter.delete("/:cardId/likes", celebrate(cardIdScheme), disableLike);

export default cardRouter;
