import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const { NODE_ENV = "local", JWT_SECRET = "" } = process.env;

export default async function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "No autorizado" });
  }
  console.log("authorization passed");
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret-ñ"
    );
  } catch (err) {
    return res
      .status(401)
      .send({ message: "La verificación del usuario fue incorrecta" });
  }
  req.user = payload;
  next();
}
