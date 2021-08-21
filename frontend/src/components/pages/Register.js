import React, { useState } from "react";
import { registerUser } from "../../actions/users";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Register = ({ isAuthenticated, registerUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
  });
  const { email, name, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      registerUser(email, name, password);
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <h1 className="login__title">
        Oi, regitre-se para participar da nossa família!
      </h1>
      <form className="login__form" onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          required
          className="login__input"
          placeholder="Digite seu nome aqui"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
          className="login__input"
          placeholder="Digite seu email aqui"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          required
          className="login__input"
          placeholder="Digite sua senha aqui"
        />{" "}
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
          required
          className="login__input"
          placeholder="Digite novamente sua senha aqui"
        />
        <input type="submit" value="Entrar" className="login__input" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(Register);
