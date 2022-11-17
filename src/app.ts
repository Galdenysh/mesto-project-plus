import express, { NextFunction, Request, Response } from "express";
import { errors, celebrate } from "celebrate";
import getMestoDb from "./database/mongo";
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { ErrorWithStatus } from "./utils/types";
import { createUserScheme, loginScheme } from "./utils/scheme";
import { requestLogger, errorLogger } from "./middlewares/logger";

const port = process.env.PORT as string;
const app = express();

getMestoDb();

app.use(express.json());
app.use(express.urlencoded());

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Project Mesto Backend");
});

app.post("/signin", celebrate(loginScheme), login);
app.post("/signup", celebrate(createUserScheme), createUser);

app.use("/users", auth, userRouter);
app.use("/cards", auth, cardRouter);

app.use(errorLogger);

app.use(errors());

app.use(
  // eslint-disable-next-line no-unused-vars
  (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message, name } = err;

    if (name === "ValidationError") {
      res.status(400).send({ message: "Переданы некорректные данные" });
      return;
    }

    if (name === "MongoServerError") {
      if (err.code === 11000) {
        res.status(409).send({ message: "Конфликт данных" });
        return;
      }
    }

    res.status(statusCode).send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
  }
);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Такой страницы не существует");
});

app.listen(+port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
