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
    console.error(err);
    return res.status(500).send({ message: "Error while processing request" });
  }
};
