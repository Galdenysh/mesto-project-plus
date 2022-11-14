import mongoose from "mongoose";

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
  },
});

export default mongoose.model<IUser>("User", userSchema);
