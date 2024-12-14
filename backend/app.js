import express from "express";
import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";
import mongoose from "mongoose";
import auth from "./middleware/auth.js";
import cors from "cors";
import { createUser, loginUser } from "./controllers/users.js";
import { errorLogger, requestLogger } from "./middleware/logs.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Algo salio mal -------", err);
  });

app.use(cors());
app.options("*", cors());
app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "6752633d0a6f650e76aec19e",
//   };
//   next();
// });
app.use(requestLogger);

app.post("/signin", loginUser);
app.post("/signup", createUser);
app.use(auth);

app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

app.use(errorLogger);

app.get("/", (req, res) => {
  res.send("ERROR 404 --- No hay frontend");
});

app.listen(PORT, function () {
  console.log("Hola mundo del backend....");
});
