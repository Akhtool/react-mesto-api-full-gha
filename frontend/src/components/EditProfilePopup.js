import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState(""),
    [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="userName"
        className="popup__input popup__input_type_name"
        id="username-input"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleNameChange}
        value={name || ""}
      />
      <span className="username-input-error popup__input-error"></span>
      <input
        type="text"
        name="job"
        className="popup__input popup__input_type_description"
        id="user-description-input"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span className="user-description-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
