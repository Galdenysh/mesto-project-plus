import { Joi } from "celebrate";
import { emailPattern } from "./validEmail";
import { urlPattern } from "./validUrl";

export const createCardScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
};

export const refrashUserScheme = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
    })
    .unknown(true),
};

export const refrashAvatarScheme = {
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
};

export const loginScheme = {
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailPattern),
    password: Joi.string().required(),
  }),
};

export const createUserScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().pattern(emailPattern),
    password: Joi.string().required(),
  }),
};

export const cardIdScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

export const userIdScheme = {
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
};
