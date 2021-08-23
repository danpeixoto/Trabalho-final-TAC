import React, { useEffect, useState } from "react";
import { getSaleItems } from "../../actions/sale";
import { v4 as uuid } from "uuid";
const SaleItems = ({ saleId }) => {
  const [items, setItems] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const res = await getSaleItems(saleId);

      setItems(res.products);
    } catch (err) {
      console.log(err);
    }
  };

  if (!items) {
    return null;
  }

  const itemDiv = (item) => (
    <div className="mt--medium" key={uuid()}>
      <p>
        <strong>{item.product.name}</strong>
      </p>
      <p>Categoria:{item.product.category}</p>
      <p>Valor: R${item.value}</p>
      <p>Quantidade: {item.amount}</p>
    </div>
  );

  return (
    <div>
      <button
        onClick={() => setIsShowing(!isShowing)}
        className="btn btn--blue btn--center btn--fill btn--big"
      >
        {!isShowing ? "Mostrar" : "Esconder"} produtos comprados
      </button>
      {isShowing && items.map((item) => itemDiv(item))}
    </div>
  );
};

export default SaleItems;
