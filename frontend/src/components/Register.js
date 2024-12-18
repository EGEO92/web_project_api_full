import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";

export default function Register(props) {
  const [user, setUser] = useState({ email: "", password: "" });
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const history = useNavigate();

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setUser((state) => ({
      ...state,
      [key]: value,
    }));
    console.log(user);
  }

  async function handleSubmit(e) {
    console.log("Handle submit???");
    e.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        setIsSuccess(false);
        handleOpen();
        return;
      }
      const res = await auth.register(user);
      if (res) {
        setIsSuccess(true);
        handleOpen();
        await new Promise((resp) => {
          setTimeout(() => {
            handleCloseTip();
            resp();
          }, 1000);
        });
        history("/signin");
      } else {
        setIsSuccess(false);
        handleOpen();
        throw new Error();
      }
    } catch (er) {
      setIsSuccess(false);
      handleOpen();
      throw new Error(er);
    }
  }

  function handleCloseTip() {
    props.onClose();
    setToolTipOpen(false);
  }

  function handleOpen() {
    setToolTipOpen(true);
    props.successInfo();
  }

  return (
    <div className="register__page">
      <div
        className={`page-filter ${props.isFilterOn ? "popup__show" : ""}`}
      ></div>
      <h2 className="register__title title">Regístrate</h2>
      <form className="register__form form user__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="register__input register__input-email"
          onChange={handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Contraseña"
          className="register__input register__input-password"
          required
          minLength={8}
        ></input>
        <button type="submit" className="register__input register__submit">
          Registrate
        </button>
      </form>
      <Link to="/signin" className="register__link">
        ¿Ya eres miembro? Inicia sesión aquí
      </Link>
      <InfoTooltip
        isOpen={toolTipOpen}
        onClose={handleCloseTip}
        isSuccess={isSuccess}
      />
    </div>
  );
}
