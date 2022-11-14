import express, { Request, Response } from "express";
import getMestoDb from "./database/mongo";
import userRouter from "./routes/users";

const { PORT = 3000 } = process.env;
const app = express();

getMestoDb();

app.use(express.json());
app.use(express.urlencoded());
app.use("/users", userRouter);

app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Project Mesto Backend");
});
