import mongoose from "mongoose";
import bcrypt from "bcrypt";
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

interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials: (
    // eslint-disable-next-line no-unused-vars
    email: string,
    // eslint-disable-next-line no-unused-vars
    password: string
  ) => Promise<mongoose.Document<IUser>>;
}

const userSchema = new Schema<IUser, UserModel>({
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

userSchema.static(
  "findUserByCredentials",
  async function findUserByCredentials(email: string, password: string) {
    try {
      const findedUser = (await this.findOne({ email })) as IUser | null;

      if (!findedUser) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      const matched = await bcrypt.compare(password, findedUser.password);

      if (!matched) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }

      return findedUser;
    } catch (err) {
      return Promise.reject(new Error("Неправильные почта или пароль"));
    }
  }
);

export default mongoose.model<IUser, UserModel>("User", userSchema);
