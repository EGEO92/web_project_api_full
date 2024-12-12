import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await auth.login(user);
      const { error, token } = await res.json();
      if (error) {
        setIsSuccess(false);
        handleOpen();
      }
      if (token) {
        localStorage.setItem("jwt", token);
        props.logIn();
        history("/");
      }
    } catch (er) {
      setIsSuccess(false);
      handleOpen();
      //throw new Error(er);
    }
  }

  function handleCloseTip() {
    setToolTipOpen(false);
    props.onClose();
  }

  function handleOpen() {
    props.successInfo();
    setToolTipOpen(true);
  }

  return (
    <div className="login__page">
      <h2 className="login__title title">Inicia sesión</h2>
      <form className="login__form form user__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="login__input login__input-email"
          required
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login__input login__input-password"
          required
          onChange={handleChange}
          minLength={8}
        ></input>
        <button type="submit" className="login__input login__submit">
          Inicia sesión
        </button>
      </form>
      <Link to="/signup" className="login__link">
        ¿Aún no eres miembro? Regístrate aquí
      </Link>
      <InfoTooltip
        isOpen={toolTipOpen}
        onClose={handleCloseTip}
        isSuccess={isSuccess}
      />
    </div>
  );
}
