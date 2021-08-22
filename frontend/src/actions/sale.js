import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { SALES_QUERY_FAIL, SALES_QUERY_SUCCESS } from "./types";

export const newSale = async (id, amount, stars) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ products: [{ id, amount }] });
  const likeBody = JSON.stringify({ productId: id, stars });
  try {
    const res = await axios.post("http://localhost:4000/sale", body, config);
    const res2 = await axios.post(
      "http://localhost:5000/like",
      likeBody,
      config,
    );
    console.log(res2.data);
    console.log(res.data);
  } catch (err) {
    console.error(err);
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
