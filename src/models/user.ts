import mongoose from "mongoose";
import validator from "validator";
import validUrl from "../utils/validUrl";

const { Schema } = mongoose;

interface IUser {
  name?: string;
  about?: string;
  avatar?: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlength: 30,
    required: true,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    required: true,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (str: string) => validUrl(str),
      message: "URL-адрес недействителен",
    },
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (str: string) => validator.isEmail(str),
      message: "URL-адрес недействителен",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", userSchema);
