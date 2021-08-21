import React, { useEffect } from "react";
import { connect } from "react-redux";
import { searchProductsByName } from "../../actions/products";
import ProductItem from "../productItem/ProductItem";

const SearchedProducts = ({
  searchProductsByName,
  searchedProducts,
  match,
}) => {
  useEffect(() => {
    searchProductsByName(match.params.name);
  }, [match.params.name]);

  if (!searchedProducts.length) {
    return <div>Produtos carregando</div>;
  }

  return (
    <div className="products">
      {searchedProducts.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchedProducts: state.products.searchedProducts,
});
export default connect(mapStateToProps, { searchProductsByName })(
  SearchedProducts,
);
