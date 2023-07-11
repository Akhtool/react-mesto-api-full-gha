import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === card.owner;
  const isLiked = card.likes.some((i) => {
    return i === currentUser._id
  });
  const cardLikeButtonClassName = !isLiked
    ? "card__like"
    : "card__like card__like_active";

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          type="button"
          className="card__delete-button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="card__info">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
