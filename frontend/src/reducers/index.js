import { combineReducers } from "redux";
import products from "./products";
import user from "./user";
import sale from "./sale";
import alert from "./alert";
export default combineReducers({ alert, products, user, sale });
