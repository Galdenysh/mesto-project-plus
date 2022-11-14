/* eslint-disable no-console */
import { Request, Response } from "express";
import user from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await user.find({});
    return res.status(200).send(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await user.findById(req.params.userId);
    return res.status(200).send(currentUser);
  } catch (err) {
    const error = err as Error;

    if (error.name === "CastError") {
      return res
        .status(404)
        .send({ message: `User ${req.params.userId} not found` });
    }

    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = await user.create({ name, about, avatar });
    return res.status(200).send(newUser);
  } catch (err) {
    const error = err as Error;

    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Unvalible user data" });
    }

    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const refrashUser = async (req: any, res: Response) => {
  const { name, about } = req.body;
  try {
    const refrashedUser = await user.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true }
    );
    return res.status(200).send(refrashedUser);
  } catch (err) {
    const error = err as Error;

    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Unvalible user data" });
    }

    if (error.name === "CastError") {
      return res
        .status(404)
        .send({ message: `User ${req.user._id} not found` });
    }

    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};

export const refrashAvatar = async (req: any, res: Response) => {
  const { avatar } = req.body;
  try {
    const refrashedUser = await user.findByIdAndUpdate(req.user._id, {
      avatar,
    });
    return res.status(200).send(refrashedUser);
  } catch (err) {
    const error = err as Error;

    if (error.name === "ValidationError") {
      return res.status(400).send({ message: "Unvalible user data" });
    }

    if (error.name === "CastError") {
      return res
        .status(404)
        .send({ message: `User ${req.user._id} not found` });
    }

    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};
