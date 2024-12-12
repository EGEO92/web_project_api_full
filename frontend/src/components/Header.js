import logoUs from "../images/header_title.png";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const history = useNavigate();

  function handleLogout() {
    props.onSignOut();
  }
  function redirect() {
    history("/signin");
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
        <p className="header__text" onClick={redirect}>
          Iniciar sesion
        </p>
      )}
    </header>
  );
}
