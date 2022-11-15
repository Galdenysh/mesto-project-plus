import { Router } from "express";
import {
  getCards,
  createCard,
  deleteCard,
  enableLike,
  disableLike,
} from "../controllers/cards";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", createCard);
cardRouter.delete("/:cardId", deleteCard);
cardRouter.put("/:cardId/likes", enableLike);
cardRouter.delete("/:cardId/likes", disableLike);

export default cardRouter;
