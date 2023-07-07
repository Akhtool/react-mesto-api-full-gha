import { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState("");
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const tokenCheck = useCallback(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
          }
        })
        .catch((err) => console.log(err));
    }

    return !!token
  }, [token]);

  useEffect(() => {
    if (tokenCheck()) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCardsData]) => {
          setCurrentUser(userData);
          setCards(initialCardsData);
        })
        .catch((err) => console.error(err));

      navigate("/", { replace: true });
    }
  }, [navigate, tokenCheck]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((prevState) => prevState.filter((c) => c._id !== cardId));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    api
      .updateAvatar(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardData) {
    api
      .addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleLogin(userData) {
    auth
      .login(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setEmail(userData.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleRegister(regUserData) {
    auth
      .register(regUserData)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsRegistrationSuccess(true);
        handleSignup("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleSignup("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleSignout() {
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Login onLogin={handleLogin} title="Вход" buttonText="Войти" />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegister}
                title="Регистрация"
                buttonText="Зарегистрироваться"
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={setIsEditProfilePopupOpen}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={setIsEditAvatarPopupOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                tokenCheck={tokenCheck}
                email={email}
                onSignout={handleSignout}
              />
            }
          />
        </Routes>

        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          message={isInfoTooltipMessage}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;