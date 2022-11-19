/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import Card from "../models/card";
import NotFoundError from "../utils/errors/not-found-err";
import ForbiddenError from "../utils/errors/forbidden-err";

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await Card.find({});
    return res.status(200).send(cards);
  } catch (err) {
    return next(err);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name, link, owner: req.user._id });
    return res.status(200).send(newCard);
  } catch (err) {
    return next(err);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentCard = await Card.findById(req.params.cardId);

    if (!currentCard)
      throw new NotFoundError("Карточка с указанным ID не найдена");

    if (!currentCard.owner.equals(req.user._id as string)) {
      throw new ForbiddenError("Недостаточно прав для удаления");
    }

    await Card.deleteOne({ _id: req.params.cardId });

    return res.status(200).send(currentCard);
  } catch (err) {
    return next(err);
  }
};

export const enableLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $addToSet: { likes: req.user._id },
      },
      { new: true }
    );

    return res.status(200).send(likedCard);
  } catch (err) {
    return next(err);
  }
};

export const disableLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dislikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );

    return res.status(200).send(dislikedCard);
  } catch (err) {
    return next(err);
  }
};
