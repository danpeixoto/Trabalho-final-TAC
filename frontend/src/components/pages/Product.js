import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import store from "../../store";
import { setAlert } from "../../actions/alert";
import { loadSelectedProduct, addProductToCart } from "../../actions/products";
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
    setImageIndex(Math.floor(Math.random() * 4));
  }, []);

  const [inputData, setInputData] = useState({
    amount: 1,
    stars: 1,
  });
  const [imageIndex, setImageIndex] = useState(0);
  const [bought, setBought] = useState(false);

  const images = [Imagem1, Imagem2, Imagem3, Imagem4];

  const validateAndSetChange = (e, max, min = 1) => {
    let firstValidation = e.target.value <= 0 ? min : e.target.value;

    let validAmount = firstValidation > max ? max : firstValidation;

    setInputData({ ...inputData, [e.target.name]: validAmount });
  };
  const addToCart = () => {
    if (isAuthenticated) {
      addProductToCart({
        id,
        stars: stars,
        amount: amount,
        name,
        value,
      });
      setTimeout(() => setBought(true), 500);
    } else {
      store.dispatch(setAlert("Faça login para poder adicionar ao carrinho"));
    }
  };

  if (bought) {
    return <Redirect to="/cart" />;
  }

  if (!selectedProduct) {
    return <div className="product">Produto Carregando...</div>;
  }

  const {
    id,
    avg_likes,
    name,
    category,
    description,
    value,
    total_available,
  } = selectedProduct;

  const { amount, stars } = inputData;

  return (
    <div className="product">
      <div className="product__left">
        <img src={images[imageIndex]} alt="" className="left__img" />
        <p className="left__text">Valor:</p>
        <p className="left__value-price">
          R$
          {value}
        </p>
        <p className="left__text">Quantidade:</p>
        <input
          className="left__input"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => validateAndSetChange(e, total_available)}
          min="1"
          max={total_available}
        />
        <p className="left__text">Nota:</p>
        <input
          className="left__input"
          type="number"
          name="stars"
          value={stars}
          onChange={(e) => validateAndSetChange(e, 5)}
          min="1"
          max="5"
        />
        <button className="btn product__cta" onClick={addToCart}>
          Adicionar ao carrinho
        </button>
      </div>
      <div className="product__right">
        <h1 className="product__name">{name}</h1>
        <h2>
          Nota média:{" "}
          {avg_likes > 0
            ? `${avg_likes.toFixed(2)} / 5`
            : "Nenhuma nota foi atribuida a esse produto"}
        </h2>
        <h3>Categoria: {category}</h3>
        <div className="product__description">
          <h2>Descrição</h2>
          <p className="description__text">{description}</p>
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
