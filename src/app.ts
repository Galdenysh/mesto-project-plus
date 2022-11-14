import express, { Request, Response } from "express";
import getStaticMongoClient from "./database/mongo";

const { PORT = 3000 } = process.env;
const app = express();
const client = getStaticMongoClient();
const getDB = async () => {
  await client.connect();
  const db = client.db("mestodb");

  return db;
};

getDB().then((res) => {
  console.log(res);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<html>
        <body>
            <p>Hello world</p>
        </body>
      </html>`
  );
});
