import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("http://localhost:4000/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("http://localhost:4000/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
export const registerUser = (email, name, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, name, password });

  try {
    const res = await axios.post("http://localhost:4000/user", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
