import axios from "axios";
import { LOAD_ALL_PRODUCTS } from "./types";

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
