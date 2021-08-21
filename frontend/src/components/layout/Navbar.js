import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../logo.png";
const Navbar = () => {
  const [productQuery, setProductQuery] = useState("");
  const history = useHistory();
  const onChange = (e) => {
    setProductQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.replace(`/searched-products/${productQuery}`);
  };

  return (
    <header>
      <nav className="nav">
        <Link to="/">
          <img src={Logo} alt="Logo" className="nav__img" />
        </Link>
        <form className="nav__form" onSubmit={(e) => onSubmit(e)}>
          <input
            placeholder="Busque por um produto aqui..."
            className="nav__input"
            type="text"
            name="search"
            value={productQuery}
            onChange={(e) => onChange(e)}
          />
          <input
            type="submit"
            className={`btn nav__search-btn ${
              !productQuery ? "nav__search-btn--hidden" : ""
            }`}
            value="&#128269;"
          />
        </form>

        <ul className="nav__user-options">
          <li className="user-options__item">
            <Link to="/login">Login</Link>
          </li>
          <li className="user-options__item">
            <Link to="/register">Criar conta</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
