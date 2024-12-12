import mongoose from "mongoose";
import infoValidator from "validator";

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (v) {
        if (infoValidator.isURL(v)) {
          return true;
        }
        // const regExValidate = /(https?\:\/\/\S)(\.[a-z]{2,}\#?)/;
        // if (regExValidate.test(v)) {
        //   return true;
        // }
      },
      message: (props) => `${props.value} es un URL invalido`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Card = mongoose.model("card", cardSchema);

export default Card;
