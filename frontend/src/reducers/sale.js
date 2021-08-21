import { SALES_QUERY_FAIL, SALES_QUERY_SUCCESS } from "../actions/types";

const initialState = {
  allSales: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case SALES_QUERY_SUCCESS:
      return { allSales: payload };
    case SALES_QUERY_FAIL:
      return { allSales: [] };
    default:
      return state;
  }
}
