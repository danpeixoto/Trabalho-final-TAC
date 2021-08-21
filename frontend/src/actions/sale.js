import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { SALES_QUERY_FAIL, SALES_QUERY_SUCCESS } from "./types";

export const newSale = async (id, amount) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ products: [{ id, amount }] });

  try {
    const res = await axios.post("http://localhost:4000/sale", body, config);
    // dispatch({
    //   type: SALE_SUCCESS,
    //   payload: res.data,
    // });
    console.log(res.data);
  } catch (err) {
    console.error(err);
    // dispatch({
    //   type: SALE_FAIL,
    //   payload: res.data,
    // });
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
  }
};
