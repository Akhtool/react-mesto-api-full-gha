import { useState } from "react";
import Header from "./Header";

const Login = ({ onLogin, title, buttonText }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(formValue);
  };

  return (
    <>
      <Header buttonText="Регистрация" buttonLink="/sign-up" />
      <section className="login-form">
        <h2 className="login-form__title">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form__inputs-all">
            <label>
              <input
                className="login-form__input"
                value={formValue.email || ""}
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
                value={formValue.password || ""}
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
      </section>
    </>
  );
};

export default Login;
