import mongoose from "mongoose";
import validUrl from "../utils/validUrl";

const { Schema } = mongoose;

interface IUser {
  name: String;
  about: String;
  avatar: String;
}

const userSchema = new Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (str: string) => validUrl(str),
      message: "URL-адрес недействителен",
    },
  },
});

export default mongoose.model<IUser>("User", userSchema);
