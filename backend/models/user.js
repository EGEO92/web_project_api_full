import mongoose from "mongoose";
import infoValidator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "EGEO",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Web developer",
  },
  avatar: {
    type: String,
    minlength: 8,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        const regExValidate = /(https?\:\/\/\S)(\.[a-z]{2,}\#?)/;
        if (regExValidate.test(v)) {
          return true;
        }
      },
      message: (props) => `${props.value} es un URL invalido`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        if (typeof v === "string") {
          return infoValidator.isEmail(v);
        }
      },
      message: (props) => `${props.value} formato de email incorrecto`,
    },
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    select: false,
    validate: {
      validator: function (v) {
        if (typeof v === "string") {
          let pass = infoValidator.isStrongPassword(v);
          if (pass > 43) {
            return true;
          }
        }
      },
      message: (props) => `${props.value} formato de password incorrecto`,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("credenciales incorrectas"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("credenciales incorrectas"));
        }
        return user;
      });
    });
};

const User = mongoose.model("user", userSchema);

export default User;
