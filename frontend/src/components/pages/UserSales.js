import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getAllSales } from "../../actions/sale";
import SaleItems from "../saleItems/SaleItems";
const UserSales = ({ isAuthenticated, sales, getAllSales }) => {
  useEffect(() => {
    getAllSales();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="user-sales">
      <h1 className="user-sales__title">Minhas compras</h1>
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="user-sales__item"
          onClick={() => console.log(sale.id)}
        >
          <h2 className="user-sales__date">
            Compra realizada em: {new Date(sale.sale_date).toLocaleString()}
          </h2>
          <p className="user-sales__amount">
            Quantidade de produtos: {sale.total_items}
          </p>
          <p className="user-sales__price">
            Total: R${`${sale.total_value}`.replace(".", ",")}
          </p>
          <SaleItems saleId={sale.id} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sales: state.sale.allSales,
  isAuthenticated: state.user.isAuthenticated,
});
export default connect(mapStateToProps, { getAllSales })(UserSales);
