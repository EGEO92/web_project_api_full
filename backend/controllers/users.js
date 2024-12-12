import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Ups! Aun no estamos listos...creo" });
  }
}

export async function getUserById(req, res) {
  try {
    if (req.params._id === "me" || req.params._id === req.user._id) {
      const { _id } = req.user;
      const user = await User.findById(_id).orFail();
      return res.send(user);
    }
    res.status(404).send({ message: "No encontrado o no existe" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send({ message: "Algo esta mal..." });
    }
    if (err.name === "DocumentNotFound") {
      return res.status(404).send({ message: "No encontrado o no existe" });
    }
    return res
      .status(500)
      .send({ message: "Error del serv....^#&#*&#@....idor....*@#$%^HELP" });
  }
}

export async function createUser(req, res) {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.send({ _id: newUser._id, email: newUser.email });
  } catch (err) {
    if (err.name === "ValidatorError") {
      res.status(400).sen({ message: "AJAM!! Revisa bien tus datos" });
    }
    return res
      .status(500)
      .send({ message: "Error en el servidor....*@#$%^HELP" });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true }
    ).orFail();
    return res.send(updatedUser);
  } catch (err) {
    if (err === "CastError") {
      return res
        .status(400)
        .send({ message: "Algo no se hizo correctamente, revisa los datos" });
    }
    if (err === "DocumentNotFound") {
      return res
        .status(404)
        .send({ message: "Usuario inexistente o no has logeado" });
    }
    return res
      .status(500)
      .send({ message: "Error del serv....^#&#*&#@....idor....*@#$%^HELP" });
  }
}

export async function updateAvatar(req, res) {
  try {
    const { avatar } = req.body;
    const newAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true }
    ).orFail();
    console.log("back end: ", newAvatar);
    return res.send(newAvatar);
  } catch (err) {
    if (err === "CastError") {
      return res
        .status(400)
        .send({ message: "Algo no se hizo correctamente, revisa los datos" });
    }
    if (err === "DocumentNotFound") {
      return res
        .status(404)
        .send({ message: "Usuario inexistente o no has logeado" });
    }
    return res
      .status(500)
      .send({ message: "Error del serv....^#&#*&#@....idor....*@#$%^HELP" });
  }
}

export async function loginUser(req, res) {
  // try {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "super-strong-secret-ñ", {
        expiresIn: "7d",
      });
      res.send({ token, status: "ok" });
    })
    .catch(() => {
      return res.status(401).send({ message: "Email o contraseña incorrecta" });
    });

  //   const user = await User.findUserByCredentials(email, password).orFail();
  //   // if (!user) {
  //   //   return Promise.reject();
  //   // }
  //   const token = jwt.sign({ _id: user._id }, "super-strong-secret-ñ", {
  //     expiresIn: "7d",
  //   });
  //   return res.send(token);
  // } catch (err) {
  //   return res.status(401).send({ message: "Email o contraseña incorrecta" });
  // }
}
