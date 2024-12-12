import Card from "../models/card.js";

export async function getCards(req, res) {
  try {
    const cards = await Card.find({}).populate("owner").orFail();
    return res.send(cards);
  } catch (err) {
    res.status(500).send({ message: "Ups, nuestro error...^$%%76" });
  }
}

export async function createCard(req, res) {
  console.log("back end, add card: ", req.body.owner);
  try {
    const { name, link, owner } = req.body;

    const newCard = await Card.create({
      name,
      link,
      owner,
    });
    console.log("carta nueva??", newCard);
    res.send(newCard);
  } catch (err) {
    console.log("back end error: ", err);
    if (err.name === "ValidatorError") {
      return res.status(400).send({
        message: "Algo hiciste mal... Revisa las comillas o yo que se",
      });
    }
    return res
      .status(500)
      .send({ message: "Ha ocurrido un error en el servidor" });
  }
}

export async function deleteCardById(req, res) {
  try {
    const { _id } = req.params;
    const card = await Card.findById(_id).orFail();
    if (card.owner.valueOf() === _id) {
      const cardToDelete = await Card.findByIdAndRemove(_id);
      res.send(cardToDelete);
    }
    return res.status(403).send({
      message: `Quien eres tu? porque intentas borrar la carta de ${card.owner.valueOf()}`,
    });
  } catch (err) {
    console.log("error delete: ", err);
    if (err.name === "CastError") {
      return res.status(400).send("No sabemos que paso... otra vez...");
    }
    if (err.name === "DocumentNotFound") {
      return res
        .status(404)
        .send(
          "Buenas noticias, no existe el error que querias desacer... O es malo que no existiera antes?"
        );
    }
    return res.status(500).send({
      message: "Error del serv....^#&#*&#@....AAAHHAHAHA....*@#$%^....HELP",
    });
  }
}

export async function giveLikes(req, res) {
  try {
    console.log(req.params);
    Card.findByIdAndUpdate(
      req.params._id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send("No sabemos que paso... otra vez...");
    }
    if (err.name === "DocumentNotFound") {
      return res.status(404).send("Creo que esta carta no existe....");
    }
    return res.status(500).send({
      message: "Error del serv....^#&#*&#@....AAAHHAHAHA....*@#$%^....HELP",
    });
  }
}

export async function deleteLikes(req, res) {
  try {
    Card.findByIdAndUpdate(
      req.params._id,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail();
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).send("No sabemos que paso... otra vez...");
    }
    if (err.name === "DocumentNotFound") {
      return res.status(404).send("Creo que esta carta no existe....");
    }
    return res.status(500).send({
      message: "Error del serv....^#&#*&#@....AAAHHAHAHA....*@#$%^....HELP",
    });
  }
}
