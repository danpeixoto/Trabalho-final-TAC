import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/users";
import Logo from "../../logo.png";

const Navbar = ({ isAuthenticated, logout }) => {
  const [productQuery, setProductQuery] = useState("");
  const history = useHistory();
  const onChange = (e) => {
    setProductQuery(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    history.replace(`/searched-products/${productQuery}`);
  };

  const logoutUser = () => logout();

  const guestOptions = () => (
    <ul className="nav__user-options">
      <li className="user-options__item">
        <Link to="/login">Login</Link>
      </li>
      <li className="user-options__item">
        <Link to="/register">Criar conta</Link>
      </li>
    </ul>
  );
  const authenticatedUserOptions = () => (
    <ul className="nav__user-options">
      <li className="user-options__item">
        <Link to="/my-purchases">
          <span aria-label="icon" role="img">
            &#x1F4E6;
          </span>
          Minhas compras
        </Link>
      </li>
      <li className="user-options__item">
        <Link to="/cart">
          <span aria-label="icon" role="img">
            &#128722;
          </span>
          Carrinho
        </Link>
      </li>
      <li className="user-options__item">
        <button className="btn" onClick={logoutUser}>
          Logout
        </button>
      </li>
    </ul>
  );
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

        {isAuthenticated ? authenticatedUserOptions() : guestOptions()}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
