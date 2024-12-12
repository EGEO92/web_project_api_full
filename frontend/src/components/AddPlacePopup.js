import { createRef } from "react";
import PopUpWithForm from "./PopUpWithForm";

export default function AddPlacePopup({ isOpen, onClose, submitPlace }) {
  const titleRef = createRef();
  const imgLinkRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("card img: ", imgLinkRef.current.value);
    submitPlace({
      name: titleRef.current.value,
      link: imgLinkRef.current.value,
    });
  }
  function validation(ref) {
    if (ref.current.value.length > 1) {
      return;
    }
    console.log("Invalid input...");
  }

  return (
    <PopUpWithForm
      id="addCards"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Nuevo lugar"
      name="Place"
      buttonText="Crear"
    >
      <input
        className="popup__title popup__name popup__text form__input"
        type="text"
        name="name"
        id="place"
        placeholder="Título"
        minLength="2"
        maxLength="40"
        required
        onBlur={() => {
          validation(titleRef);
        }}
        autoComplete="off"
        ref={titleRef}
      />
      <span className="place-error form__error"></span>

      <input
        className="popup__link popup__text form__input"
        type="url"
        name="link"
        id="link"
        placeholder="Enlace a la imagen"
        minLength="7"
        required
        autoComplete="off"
        ref={imgLinkRef}
      />
      <span className="link-error form__error"></span>
    </PopUpWithForm>
  );
}
