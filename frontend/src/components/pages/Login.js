import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { password, email } = formData;
  const onChange = (e) => setFormData({ [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(password, email);
  };
  return (
    <div className="login">
      <h1 className="login__title">
        Olá, coloque seu email e senha para poder entrar.
      </h1>
      <form className="login__form" onSubmit={(e) => onSubmit(e)}>
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
        />
        <input type="submit" value="Entrar" className="login__input" />
      </form>
      <Link to="/register"> Não possui uma conta? Crie uma já</Link>
    </div>
  );
};

export default Login;
