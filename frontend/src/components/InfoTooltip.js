import successImage from "../images/icon-success.svg";
import failImage from "../images/icon-fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <section
      className={`info-tooltip ${isOpen ? "info-tooltip_opened" : ""}`}
      onClick={({ target }) => {
        if (
          target.classList.contains("info-tooltip_opened") ||
          target.classList.contains("info-tooltip__close")
        ) {
          onClose();
        }
      }}
    >
      <div className="info-tooltip__container">
        <button
          type="button"
          onClick={onClose}
          className="info-tooltip__close"
        />
        <img
          src={isSuccess ? successImage : failImage}
          className="info-tooltip__img"
          alt=""
        ></img>
        <p className="info-tooltip__text">{message}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
