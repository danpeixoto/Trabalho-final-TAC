import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadAllProducts } from "../../actions/products";
import ProductItem from "../productItem/ProductItem";

const Home = ({ loadAllProducts, allProducts }) => {
  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div className="home__products">
      {allProducts.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allProducts: state.products.allProducts,
});
export default connect(mapStateToProps, { loadAllProducts })(Home);
