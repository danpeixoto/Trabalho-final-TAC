import React from "react";
import Imagem1 from "../../images/produto-1.jpg";
import Imagem2 from "../../images/produto-2.jpg";
import Imagem3 from "../../images/produto-3.jpg";
import Imagem4 from "../../images/produto-4.jpg";

const Product = () => {
  const images = [Imagem1, Imagem2, Imagem3, Imagem4];

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
          {Math.floor(Math.random() * 500) + 1}
        </p>
        <button className="btn product__cta">Comprar agora</button>
      </div>
      <div className="product__right">
        <h1 className="product__name">Nome do produto</h1>
        <h2>Nota média: 5/5</h2>
        <div className="product__description">
          <h2>Descrição</h2>
          <p className="description__text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
            assumenda sapiente impedit numquam. Quo nulla odio perspiciatis
            nostrum blanditiis ipsam ex sed praesentium eveniet repudiandae, rem
            sequi soluta optio voluptatem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
