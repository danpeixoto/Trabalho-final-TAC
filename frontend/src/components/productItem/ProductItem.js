import React from "react";
import { Link } from "react-router-dom";
import Imagem1 from "../../images/produto-1.jpg";
import Imagem2 from "../../images/produto-2.jpg";
import Imagem3 from "../../images/produto-3.jpg";
import Imagem4 from "../../images/produto-4.jpg";

const ProductItem = ({ id, name }) => {
  const images = [Imagem1, Imagem2, Imagem3, Imagem4];
  return (
    <div className="product-item">
      <img
        src={images[Math.floor(Math.random() * 4)]}
        alt="Imagem do produto"
        className="product-item__img"
      />
      <p className="product-item__name">{name}</p>
      <Link to={`/product/${id}`} className="product-item__about">
        Saiba mais
      </Link>
    </div>
  );
};

export default ProductItem;
