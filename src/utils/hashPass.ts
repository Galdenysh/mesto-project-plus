/* eslint-disable no-console */
import bcrypt from "bcrypt";

export default async function hashPass(password: string) {
  const saltRounds = 10;

  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.error(err);
  }

  return null;
}
