import closeButton from "../images/Close_Icon.png";

export default function PopUpWithForm(props) {
  return (
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup__show" : ""
      }`}
    >
      <h2 className="profile__popup-title, popup__title">{props.title}</h2>
      <form
        onSubmit={props.onSubmit}
        className={`profile__form-avatar form popup_type_${props.name}`}
        name={props.name}
      >
        {props.children}
        <button className="popup__submit button form__submit" type="submit">
          {props.buttonText}
        </button>
      </form>
      <button
        className="popup__close close popup__closeadd button"
        onClick={props.onClose}
      >
        <img src={closeButton} alt="boton de cerrar" />
      </button>
    </section>
  );
}
