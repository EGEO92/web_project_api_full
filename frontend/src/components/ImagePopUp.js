import closeButton from "../images/Close_Icon.png";

export default function ImagePopUp({ link, title, onClose, isOpen }) {
  return (
    <div className={`card places__popupcard ${isOpen ? "popup__show" : ""}`}>
      <img className="card__popupimg places__popupimg" src={link} alt={title} />
      <p className="card__popuptitle places__popuptitle">{title}</p>
      <button className="places__buttonclose close button" onClick={onClose}>
        <img src={closeButton} id="close__image" alt="boton de cerrar" />
      </button>
    </div>
  );
}
