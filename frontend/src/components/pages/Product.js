import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadSelectedProduct } from "../../actions/products";
import { newSale } from "../../actions/sale";
import Imagem1 from "../../images/produto-1.jpg";
import Imagem2 from "../../images/produto-2.jpg";
import Imagem3 from "../../images/produto-3.jpg";
import Imagem4 from "../../images/produto-4.jpg";

const Product = ({
  selectedProduct,
  isAuthenticated,
  loadSelectedProduct,
  match,
}) => {
  useEffect(() => {
    loadSelectedProduct(match.params.id);
  }, []);

  const [amount, setAmount] = useState(1);
  const [imageIndex, setImageIndex] = useState(Math.floor(Math.random() * 4));
  const [bought, setBought] = useState(false);

  const images = [Imagem1, Imagem2, Imagem3, Imagem4];

  const buyProduct = () => {
    if (isAuthenticated) {
      newSale(selectedProduct.id, amount);
      setTimeout(() => setBought(true), 2000);
    } else {
      console.log("k");
    }
  };

  if (bought) {
    return <Redirect to="/my-purchases" />;
  }

  if (!selectedProduct) {
    return <div className="product">Produto Carregando...</div>;
  }

  return (
    <div className="product">
      <div className="product__left">
        <img src={images[imageIndex]} alt="" className="left__img" />
        <p className="left__value-text">Valor</p>
        <p className="left__value-price">
          R$
          {selectedProduct.value}
        </p>
        <p className="left__quantity-text">Quantidade</p>
        <input
          className="left__input"
          type="number"
          name="amount"
          id=""
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <button className="btn product__cta" onClick={buyProduct}>
          Comprar agora
        </button>
      </div>
      <div className="product__right">
        <h1 className="product__name">{selectedProduct.name}</h1>
        <h2>Nota média: 5/5</h2>
        <h3>Categoria: {selectedProduct.category}</h3>
        <div className="product__description">
          <h2>Descrição</h2>
          <p className="description__text">{selectedProduct.description}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedProduct: state.products.selectedProduct,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { loadSelectedProduct })(Product);
