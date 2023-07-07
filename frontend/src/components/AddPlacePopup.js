import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState(""),
    [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: name, link: link });
  }
  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="popup__input popup__input_type_card-name"
        placeholder="Название"
        id="card-name-input"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="card-name-input-error popup__input-error"></span>
      <input
        type="url"
        name="link"
        className="popup__input popup__input_type_card-link"
        placeholder="Ссылка на картинку"
        id="card-link-input"
        required
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span className="card-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
