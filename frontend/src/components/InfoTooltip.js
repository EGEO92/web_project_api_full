import closeButton from "../images/Close_Icon.png";
import success from "../images/readyMark.png";
import fail from "../images/failMark.png";

export default function InfoTooltip(props) {
  function handleClose() {
    props.onClose();
  }

  return (
    <div className={`tip ${props.isOpen ? "popup__show" : "tip-hidden"}`}>
      <button
        className="popup__close close popup__closeadd button"
        onClick={handleClose}
      >
        <img src={closeButton} alt="boton de cerrar" />
      </button>
      {props.isSuccess ? (
        <div className="tip__wraper">
          <img src={success} alt="Imagen de logrado" className="tip__img" />
          <p className="tip__text">¡Correcto! Ya estás registrado.</p>
        </div>
      ) : (
        <div className="tip__wraper">
          <img src={fail} alt="Imagen de fallado" className="tip__img" />
          <p className="tip__text">
            Uy, algo salió mal. Por favor, inténtalo de nuevo.
          </p>
        </div>
      )}
    </div>
  );
}
