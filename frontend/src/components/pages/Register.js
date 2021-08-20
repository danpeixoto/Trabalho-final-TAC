import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, name, password } = formData;
  const onChange = (e) => setFormData({ [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(password, email);
  };
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
        />
        <input type="submit" value="Entrar" className="login__input" />
      </form>
    </div>
  );
};

export default Register;
