/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../utils/errors";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const secretKey = process.env.SECRET_KEY as string;
  let payload;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Необходима авторизация" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Необходима авторизация" });
  }

  req.user = payload;

  next();
};
