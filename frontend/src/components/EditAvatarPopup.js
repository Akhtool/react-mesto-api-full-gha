import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="link"
        ref={avatarRef}
        className="popup__input popup__input_type_avatar-link"
        placeholder="Ссылка на картинку"
        id="avatar-link-input"
        required
      />
      <span className="avatar-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
