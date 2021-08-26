import axios from "axios";
import { clearCart } from "../utils/clearCart";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import { SALES_QUERY_FAIL, SALES_QUERY_SUCCESS } from "./types";

export const newSale = (products) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    products: products.map((product) => ({
      id: product.id,
      amount: product.amount,
    })),
  });
  try {
    await axios.post("http://localhost:4000/sale", body, config);
    for (let product of products) {
      let likeBody = JSON.stringify({
        productId: product.id,
        stars: product.stars,
      });
      await axios.post("http://localhost:5000/like", likeBody, config);
    }
    clearCart();
    return true;
  } catch (err) {
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg)));
    return false;
  }
};

export const getAllSales = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:4000/sale");
    dispatch({
      type: SALES_QUERY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      console.error(err.response.data);
    }
    dispatch({
      type: SALES_QUERY_FAIL,
    });
    const errors = err.response.data.errors;

    errors.forEach((error) => dispatch(setAlert(error.msg)));
  }
};

export const getSaleItems = async (saleId) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`http://localhost:4000/sale/${saleId}`);
    return res.data;
  } catch (err) {
    return null;
  }
};
