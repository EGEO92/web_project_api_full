import deleteButton from "../images/Trashtrash.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  name,
  link,
  likes,
  onCardClick,
  card,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `${
    isLiked ? "places__button-likeactive" : "places__button-like"
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLike() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    console.log(card);
    onCardDelete(card);
  }
  return (
    <div className="places__card">
      <img
        onClick={handleClick}
        className="places__image"
        src={link}
        alt={name}
        style={{ backgroundImage: `url(${link})` }}
      />
      <div className="places__wraper">
        <h4 className="places__text">{name}</h4>
        <button
          onClick={handleLike}
          className={`${cardLikeButtonClassName} button`}
        ></button>
        <span className="places__likes">{likes}</span>
      </div>
      <button
        onClick={handleDeleteClick}
        className={`button places__button-trash ${
          isOwn ? "trash-button_visible" : "trash-button_hidden"
        }`}
      >
        <img
          className="places__imgtrash"
          id="places__imgtrash"
          src={deleteButton}
          alt="boton para eliminar tarjeta"
        />
      </button>
    </div>
  );
}
