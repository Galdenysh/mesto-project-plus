import mongoose from "mongoose";

const mestoDb = mongoose.connect("mongodb://localhost:27017/mestodb");

export default function getMestoDb() {
  return mestoDb;
}
