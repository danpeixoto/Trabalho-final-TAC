import { combineReducers } from "redux";
import products from "./products";
import user from "./user";
import sale from "./sale";

export default combineReducers({ products, user, sale });
