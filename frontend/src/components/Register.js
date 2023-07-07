import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ onRegister, title, buttonText }) {
  const [regFormValue, setRegFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegFormValue({
      ...regFormValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(regFormValue);
  };

  return (
    <>
      <Header buttonText="Войти" buttonLink="/sign-in" />
      <section className="login-form">
        <h2 className="login-form__title">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form__inputs-all">
            <label>
              <input
                className="login-form__input"
                value={regFormValue.email || ""}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                minLength="6"
                maxLength="30"
                required
              />
            </label>
            <label>
              <input
                className="login-form__input"
                value={regFormValue.password || ""}
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                minLength="6"
                maxLength="30"
                required
              />
            </label>
          </div>
          <button className={`popup__submit login-form__button`} type="submit">
            {buttonText}
          </button>
        </form>
        <span className="login-form__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="login-form__link">
            Войти
          </Link>
        </span>
      </section>
    </>
  );
}

export default Register;
