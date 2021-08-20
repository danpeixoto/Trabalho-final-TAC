import { LOAD_ALL_PRODUCTS, LOAD_SELECTED_PRODUCT } from "../actions/types";

const initialState = {
  selectedProduct: null,
  allProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
      };
    case LOAD_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };
    default:
      return state;
  }
}
