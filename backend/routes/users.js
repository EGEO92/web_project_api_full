import express from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import infoValidator from "validator";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  loginUser,
} from "../controllers/users.js";

const router = express.Router();

function validateUrl(value, helpers) {
  if (infoValidator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
}

router.get("/", getUsers);

router.get(
  "/:_id",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      params: Joi.object().keys({
        postId: Joi.string().alphanum(),
      }),
    }),
  }),
  getUserById
);

router.get(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      params: Joi.object().keys({
        postId: Joi.string().alphanum(),
      }),
    }),
  }),
  getUserById
);

router.post(
  "/signin",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  loginUser
);

router.post(
  "/signup",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);

router.patch(
  "/me",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().max(40),
      about: Joi.string().max(40),
    }),
  }),
  updateUser
);

router.patch(
  "/me/avatar",
  // celebrate({
  //   [Segments.BODY]: Joi.object().keys({
  //     avatr: Joi.string().custom(validateUrl),
  //   }),
  // }),
  updateAvatar
);

export default router;
