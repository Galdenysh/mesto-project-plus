/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UnauthorizedError from "../utils/errors/unauthorized-err";

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const secretKey = process.env.SECRET_KEY as string;
  let payload;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    payload = jwt.verify(token, secretKey) as { _id: JwtPayload };
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
    return;
  }

  req.user = payload;
  next();
};
