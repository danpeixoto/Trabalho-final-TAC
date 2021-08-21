import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
} from "../actions/types";

const initialState = {
  isAdmin: "",
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      // console.log(USER_LOADED);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: payload.isAdmin,
        user: payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, isAuthenticated: true, isLoading: false };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      // console.log("ta errado");
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        isAdmin: "",
      };
    default:
      return state;
  }
}
