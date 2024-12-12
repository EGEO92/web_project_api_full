import React from "react";
import { useContext } from "react";
import editButton from "../images/Edit_Button.png";
import addButton from "../images/Add_Button.png";
import closeButton from "../images/Close_Icon.png";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <div
        className={`page-filter ${props.isFilterOn ? "popup__show" : ""}`}
      ></div>
      <section className="profile">
        <input
          onClick={props.onEditAvatarClick}
          type="button"
          className="profile__image-filter"
        />
        <img
          src={currentUser.avatar}
          onClick={props.onEditAvatarClick}
          className="profile__image"
          id="profile__image"
          alt="Imagen de perfil"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        />

        <div className="profile__wraper">
          <div className="profile__info">
            <h2 className="profile__name">{currentUser.name}</h2>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
          <button
            onClick={props.onEditProfileClick}
            className="profile__edit-button button"
          >
            <img
              src={editButton}
              className="profile__editbutton-image"
              id="profile__editbutton-image"
              alt="Boton para editar perfil"
            />
          </button>
        </div>
        <button
          onClick={props.onAddPlaceClick}
          className="profile__add-button button"
        >
          <img
            src={addButton}
            className="profile__addbutton-image"
            id="profile__addbutton-image"
            alt="Botón para agregar más imagenes"
          />
        </button>
      </section>
      <section className="places">
        {props.cards.map((card) => (
          <Card
            name={card.name}
            link={card.link}
            likes={card.likes.length}
            key={card._id}
            onCardClick={props.onCardClick}
            card={card}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>

      <section
        className="card__popup-confirmation popup"
        id="confirmation-popup"
      >
        <h2 className="profile__popup-title, popup__title">¿Estás seguro?</h2>
        <form className="profile__form-confirmation form">
          <input
            className="popup__submit popup__submit-confirmation button form__submit"
            type="submit"
            name="confirmation"
            value="Sí"
          />
        </form>
        <button className="popup__close close popup__closeadd button">
          <img src={closeButton} id="close__image4" alt="boton de cerrar" />
        </button>
      </section>
    </main>
  );
}
