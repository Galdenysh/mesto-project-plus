import express, { Request, Response } from "express";
import getMestoDb from "./database/mongo";
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";

const { PORT = 3000 } = process.env;
const app = express();

getMestoDb();

app.use(express.json());
app.use(express.urlencoded());

// Временное решение авторизации
app.use((req: any, res: Response, next) => {
  req.user = {
    _id: "6372a13a14d8d4117b27d55f",
  };

  next();
});

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Project Mesto Backend");
});
