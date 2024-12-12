import express from "express";
import {
  getCards,
  createCard,
  deleteCardById,
  giveLikes,
  deleteLikes,
} from "../controllers/cards.js";

const router = express.Router();

router.get("/", getCards);

router.post("/", createCard);

router.delete("/:_id", deleteCardById);

router.put("/likes/:_id", giveLikes);

router.delete("/likes/:_id", deleteLikes);

export default router;
