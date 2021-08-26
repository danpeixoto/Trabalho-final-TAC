import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { newSale } from "../../actions/sale";
import { Redirect } from "react-router-dom";

const UserCart = ({ isAuthenticated, newSale }) => {
  const [bought, setBought] = useState(false);

  const buyProducts = async () => {
    if (isAuthenticated) {
      setBought(await newSale(productsArray));
    }
  };

  let productsArray = [];
  if (localStorage.cart) {
    productsArray = JSON.parse(localStorage.cart);
  }

  if (productsArray.length < 1) {
    return <h1>Não há nenhum produto no seu carrinho</h1>;
  }

  if (bought) {
    return <Redirect to="/my-purchases" />;
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Seu carrinho de compras:</h1>
      {productsArray.map((product) => (
        <div className="cart__item mt--medium" key={uuidv4()}>
          <h2>{product.name}</h2>
          <p>Valor:{product.value}</p>
          <p>Quantidade:{product.amount}</p>
        </div>
      ))}

      {isAuthenticated ? (
        <button
          onClick={buyProducts}
          className="btn btn--green btn--big btn--center btn--round btn--fill mt--medium"
        >
          Finalizar compra
        </button>
      ) : (
        <button
          disabled
          className="btn btn--green btn--big btn--center btn--round"
        >
          Faça login para finalizar compra
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { newSale })(UserCart);
