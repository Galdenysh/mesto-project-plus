import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import hashPass from "../utils/hashPass";
import User from "../models/user";
import NotFoundError from "../utils/errors/not-found-err";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await User.findById(req.params.userId);

    if (!currentUser)
      throw new NotFoundError("Пользователь с указанным ID не найден");

    return res.status(200).send(currentUser);
  } catch (err) {
    return next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const hashedPass = await hashPass(password);

    if (hashedPass === null) {
      throw new Error();
    }

    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPass,
    });
    return res.status(200).send({
      _id: newUser._id,
      name: newUser.name,
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    });
  } catch (err) {
    return next(err);
  }
};

export const refrashUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, about } = req.body;
  try {
    const refrashedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true, runValidators: true }
    );

    if (!refrashedUser)
      throw new NotFoundError("Пользователь с указанным ID не найден");

    return res.status(200).send(refrashedUser);
  } catch (err) {
    return next(err);
  }
};

export const refrashAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { avatar } = req.body;
  try {
    const refrashedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!refrashUser)
      throw new NotFoundError("Пользователь с указанным ID не найден");

    return res.status(200).send(refrashedUser);
  } catch (err) {
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY as string;
  try {
    const findedUser = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: findedUser._id }, secretKey, {
      expiresIn: "7d",
    });
    return res.status(200).send({ token });
  } catch (err) {
    return next(err);
  }
};

export const getInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = await User.findById(req.user._id);

    if (!currentUser)
      throw new NotFoundError("Пользователь с указанным ID не найден");

    return res.status(200).send(currentUser);
  } catch (err) {
    return next(err);
  }
};
