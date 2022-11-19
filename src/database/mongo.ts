import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const mongoDb = process.env.MONGO_DB as string;
const mestoDb = mongoose.connect(mongoDb);

export default function getMestoDb() {
  return mestoDb;
}
