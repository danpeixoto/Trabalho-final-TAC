import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadSelectedProduct } from "../../actions/products";
import Imagem1 from "../../images/produto-1.jpg";
import Imagem2 from "../../images/produto-2.jpg";
import Imagem3 from "../../images/produto-3.jpg";
import Imagem4 from "../../images/produto-4.jpg";

const Product = ({ selectedProduct, loadSelectedProduct, match }) => {
  useEffect(() => {
    loadSelectedProduct(match.params.id);
  }, []);
  const images = [Imagem1, Imagem2, Imagem3, Imagem4];
  //  TODO : pensar numa maneira de utilizar o estado loading
  if (!selectedProduct) {
    return <div className="product">Produto Carregando...</div>;
  }

  return (
    <div className="product">
      <div className="product__left">
        <img
          src={images[Math.floor(Math.random() * 4)]}
          alt=""
          className="left__img"
        />
        <p className="left__value-text">Valor</p>
        <p className="left__value-price">
          R$
          {selectedProduct.value}
        </p>
        <button className="btn product__cta">Comprar agora</button>
      </div>
      <div className="product__right">
        <h1 className="product__name">{selectedProduct.name}</h1>
        <h2>Nota média: 5/5</h2>
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
});

export default connect(mapStateToProps, { loadSelectedProduct })(Product);
