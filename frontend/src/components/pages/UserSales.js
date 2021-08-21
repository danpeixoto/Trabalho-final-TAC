import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getAllSales } from "../../actions/sale";

const UserSales = ({ sales, getAllSales }) => {
  useEffect(() => {
    getAllSales();
  }, []);
  return (
    <Fragment>
      <h1>Minhas compras</h1>
      {sales.map((sale) => (
        <div>
          <h2>Compra realizada em {sale.sale_date}</h2>
          <p>Quantidade de produtos: {sale.total_items}</p>
          <p>Total:{sale.total_value}</p>
        </div>
      ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  sales: state.sale.allSales,
});
export default connect(mapStateToProps, { getAllSales })(UserSales);
