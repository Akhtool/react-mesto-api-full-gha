function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_show-image ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__image-wrapper">
        <button
          type="button"
          className="popup__close-button popup__close-button_type_show-image"
          onClick={onClose}
        ></button>
        <figure className="popup__figure-wrapper">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__figure-caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
