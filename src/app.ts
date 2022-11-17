import express, { NextFunction, Request, Response } from "express";
import getMestoDb from "./database/mongo";
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";
import { ErrorWithStatus } from "./utils/types";

const port = process.env.PORT as string;
const app = express();

getMestoDb();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  res.send("Project Mesto Backend");
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/users", auth, userRouter);
app.use("/cards", auth, cardRouter);

app.use(
  // eslint-disable-next-line no-unused-vars
  (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500, message } = err;

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
