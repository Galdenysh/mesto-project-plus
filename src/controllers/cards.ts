/* eslint-disable no-console */
import { Request, Response } from "express";
import card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await card.find({});
    return res.status(200).send(cards);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  try {
    const newCard = await card.create({ name, link });
    return res.status(200).send(newCard);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const currentCard = await card.findByIdAndRemove(req.params.cardId);
    return res.status(200).send(currentCard);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const enableLike = async (req: any, res: Response) => {
  try {
    const likedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );
    return res.status(200).send(likedCard);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const disableLike = async (req: any, res: Response) => {
  try {
    const dislikedCard = await card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
    return res.status(200).send(dislikedCard);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};
