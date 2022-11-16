/* eslint-disable no-console */
import { Request, Response } from "express";
import { BAD_REQUEST, ITERNAL_SERVER_ERROR, NOT_FOUND } from "../utils/errors";
import card from "../models/card";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await card.find({});
    return res.status(200).send(cards);
  } catch (err) {
    console.error(err);
    return res
      .status(ITERNAL_SERVER_ERROR)
      .send({ message: "На сервере произошла ошибка" });
  }
};

export const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  try {
    const newCard = await card.create({ name, link, owner: req.user._id });
    return res.status(200).send(newCard);
  } catch (err) {
    const error = err as Error;

    if (error.name === "ValidationError") {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Переданы некорректные данные" });
    }

    console.error(err);
    return res
      .status(ITERNAL_SERVER_ERROR)
      .send({ message: "На сервере произошла ошибка" });
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const currentCard = await card.findByIdAndRemove(req.params.cardId);
    return res.status(200).send(currentCard);
  } catch (err) {
    const error = err as Error;

    if (error.name === "CastError") {
      return res.status(NOT_FOUND).send({
        message: `Карточка с указанным ${req.params.cardId} не найдена`,
      });
    }

    console.error(err);
    return res
      .status(ITERNAL_SERVER_ERROR)
      .send({ message: "На сервере произошла ошибка" });
  }
};

export const enableLike = async (req: Request, res: Response) => {
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
    const error = err as Error;

    if (error.name === "ValidationError") {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Переданы некорректные данные" });
    }

    if (error.name === "CastError") {
      return res.status(NOT_FOUND).send({
        message: `Карточка с указанным ${req.params.cardId} не найдена`,
      });
    }

    console.error(err);
    return res
      .status(ITERNAL_SERVER_ERROR)
      .send({ message: "На сервере произошла ошибка" });
  }
};

export const disableLike = async (req: Request, res: Response) => {
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
    const error = err as Error;

    if (error.name === "ValidationError") {
      return res
        .status(BAD_REQUEST)
        .send({ message: "Переданы некорректные данные" });
    }

    if (error.name === "CastError") {
      return res.status(NOT_FOUND).send({
        message: `Карточка с указанным ${req.params.cardId} не найдена`,
      });
    }

    console.error(err);
    return res
      .status(ITERNAL_SERVER_ERROR)
      .send({ message: "На сервере произошла ошибка" });
  }
};
