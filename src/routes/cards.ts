import { Router } from "express";
import { getCards, createCard, deleteCard } from "../controllers/cards";

const cardRouter = Router();

cardRouter.get("/", getCards);
cardRouter.post("/", createCard);
cardRouter.delete("/:cardId", deleteCard);
// cardRouter.put("/:userId/likes", getCards);
// cardRouter.delete("/:userId/likes", getCards);

export default cardRouter;
