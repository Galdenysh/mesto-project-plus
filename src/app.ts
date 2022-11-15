import express, { Request, Response } from "express";
import getMestoDb from "./database/mongo";
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";

const port = process.env.PORT as string;
const app = express();

getMestoDb();

app.use(express.json());
app.use(express.urlencoded());

// Временное решение авторизации
app.use((req: Request, res: Response, next) => {
  req.user = {
    _id: "6372a13a14d8d4117b27d55f",
  };

  next();
});

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.listen(+port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Project Mesto Backend");
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Такой страницы не существует");
});
