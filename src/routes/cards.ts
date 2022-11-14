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
cardRouter.put("/:userId/likes", enableLike);
cardRouter.delete("/:userId/likes", disableLike);

export default cardRouter;
