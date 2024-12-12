import { createRef } from "react";
import PopUpWithForm from "./PopUpWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = createRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopUpWithForm
      id="avatarForm"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Cambiar foto de perfil"
      name="Avatar"
      buttonText="Guardar"
    >
      <div className="popup-div">
        <input
          className="profile__input popup__avatar form__input popup__text"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Nueva imagen de perfil"
          required
          autoComplete="off"
          ref={inputRef}
        />
      </div>
      <span className="avatar-error form__error"></span>
    </PopUpWithForm>
  );
}
