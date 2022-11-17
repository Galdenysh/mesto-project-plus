import express, { Request, Response } from "express";
import getMestoDb from "./database/mongo";
import userRouter from "./routes/users";
import cardRouter from "./routes/cards";
import { createUser, login } from "./controllers/users";
import auth from "./middlewares/auth";

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

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.get("*", (req: Request, res: Response) => {
  res.status(404).send("Такой страницы не существует");
});

app.listen(+port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${port}`);
});
