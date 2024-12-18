import logoUs from "../images/header_title.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header(props) {
  const history = useNavigate();
  const location = useLocation();

  function handleLogout() {
    props.onSignOut();
  }
  function redirect() {
    if (location.pathname === "/signup") {
      history("/signin");
    }
    if (location.pathname === "/signin") {
      history("/signup");
    }
  }
  function handleLocation() {
    if (location.pathname === "/signup") {
      return (
        <p className="header__text" onClick={redirect}>
          Iniciar sesion
        </p>
      );
    }
    if (location.pathname === "/signin") {
      return (
        <p className="header__text" onClick={redirect}>
          Regístrate
        </p>
      );
    }
  }

  return (
    <header className="header">
      <img
        src={logoUs}
        className="header__image"
        id="header_title"
        alt="Que bonito logo que dice alrededor de U S"
      />
      {props.loggedIn ? <p className="header__text">{props.email}</p> : ""}
      {props.loggedIn ? (
        <p className="header__text" onClick={handleLogout}>
          Cerrar sesion
        </p>
      ) : (
        handleLocation()
      )}
    </header>
  );
}
