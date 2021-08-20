import axios from "axios";
import { LOAD_ALL_PRODUCTS, LOAD_SELECTED_PRODUCT } from "./types";

export const loadAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:4000/product");
    dispatch({
      type: LOAD_ALL_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({ type: LOAD_ALL_PRODUCTS, payload: {} });
  }
};

export const loadSelectedProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:4000/product/${id}`);
    dispatch({
      type: LOAD_SELECTED_PRODUCT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_SELECTED_PRODUCT,
      payload: null,
    });
  }
};
