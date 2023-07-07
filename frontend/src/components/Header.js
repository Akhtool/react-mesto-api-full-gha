import headerLogo from "../images/header__logo.svg";
import { Link } from "react-router-dom";

function Header({ buttonText, buttonLink, email, onSignout }) {
  return (
    <header className="header">
      <a href="#" className="header__logo-link">
        <img
          src={headerLogo}
          className="header__logo"
          alt="Логотип сайта Место"
        />
      </a>
      <div className="header__container">
        <span className="header__email">{email}</span>
        <Link to={buttonLink} onClick={onSignout} className="header__button">
          {buttonText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
