import { useContext } from "react";
import Card from "./Card";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onSignout,
  email,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        buttonText="Выйти"
        buttonLink="/sign-in"
        onSignout={onSignout}
        email={email}
      />
      <main className="container">
        <section className="profile">
          <button className="profile__image-edit-button" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="#" className="profile__image" />
          </button>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="add"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="cards">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;