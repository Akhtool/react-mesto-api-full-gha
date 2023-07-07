function PopupWithForm({
  name,
  title,
  isOpen,
  children,
  buttonText,
  onClose,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${
        !isOpen ? "" : "popup popup_opened"
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name="input-form"
          className={`popup__input-form popup__input-form_type_${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <input type="submit" value={buttonText} className="popup__submit" />
        </form>
        <button
          type="button"
          className="popup__close-button popup__close-button_type_add-card"
          aria-label="close"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
