import { LOAD_ALL_PRODUCTS } from "../actions/types";

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

    default:
      return state;
  }
}
