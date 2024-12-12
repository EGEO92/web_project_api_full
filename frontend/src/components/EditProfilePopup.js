import React from "react";
import { useState, useContext, useEffect } from "react";
import PopUpWithForm from "./PopUpWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setDescription(currentUser.about);
    setName(currentUser.name);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopUpWithForm
      id="profileForm"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Editar Perfil"
      name="Profile"
      buttonText="Guardar"
    >
      <input
        className="popup__name popup__text form__input"
        type="text"
        name="name"
        id="name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        required
        autoComplete="off"
        onChange={handleChangeName}
        value={name}
      />
      <span className="name-error form__error"></span>

      <input
        className="popup__occupation popup__text form__input"
        type="text"
        name="about"
        id="about"
        placeholder="Acerca de mi"
        required
        autoComplete="off"
        onChange={handleChangeDescription}
        value={description}
      />
      <span className="about-error form__error"></span>
    </PopUpWithForm>
  );
}
