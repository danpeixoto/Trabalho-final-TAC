import {
  LOAD_ALL_PRODUCTS,
  LOAD_SELECTED_PRODUCT,
  SEARCH_PRODUCTS,
} from "../actions/types";

const initialState = {
  selectedProduct: null,
  searchedProducts: [],
  allProducts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: payload,
        selectedProduct: null,
        searchedProducts: [],
      };
    case LOAD_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
        searchedProducts: [],
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        searchedProducts: payload,
      };
    default:
      return state;
  }
}
