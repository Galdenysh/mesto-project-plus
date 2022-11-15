import mongoose from "mongoose";
import validUrl from "../utils/validUrl";

const { Schema } = mongoose;

interface ICard {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (str: string) => validUrl(str),
      message: "Необходимо передать ссылку",
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICard>("Card", cardSchema);
