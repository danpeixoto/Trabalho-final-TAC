import axios from "axios";
import { setAlert } from "./alert";
import {
  LOAD_ALL_PRODUCTS,
  LOAD_SELECTED_PRODUCT,
  SEARCH_PRODUCTS,
} from "./types";

export const loadAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/product");
    dispatch({
      type: LOAD_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: LOAD_ALL_PRODUCTS, payload: {} });
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg)));
  }
};

export const searchProductsByName = (name) => async (dispatch) => {
  const body = JSON.stringify({ searched_name: name });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    dispatch({
      type: SEARCH_PRODUCTS,
      payload: [],
    });
    const res = await axios.post(
      "http://localhost:4000/product/search/",
      body,
      config,
    );
    dispatch({
      type: SEARCH_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_PRODUCTS,
      payload: [],
    });
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg)));
  }
};

export const loadSelectedProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/product/search-one/${id}`,
    );
    const res2 = await axios.get(`http://localhost:5000/like/${id}`);
    dispatch({
      type: LOAD_SELECTED_PRODUCT,
      payload: { ...res.data, ...res2.data },
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: LOAD_SELECTED_PRODUCT,
      payload: null,
    });
    const errors = err.response.data.errors;
    errors.forEach((error) => dispatch(setAlert(error.msg)));
  }
};

export const addProductToCart = (product) => {
  if (localStorage.cart) {
    console.log(localStorage.cart);
    localStorage.setItem(
      "cart",
      JSON.stringify([...JSON.parse(localStorage.cart), product]),
    );
  } else {
    localStorage.setItem("cart", JSON.stringify([product]));
  }
};
