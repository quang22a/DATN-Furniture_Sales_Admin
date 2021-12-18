import { combineReducers } from "redux";
import { authReducer } from "../core/auth/stores/reducer";
import { modalReducer } from "./modal/reducer";
import { errorReducer } from "./error/reducer";
import { homeReducer } from "../pages/home/stores/reducer";
import { productReducer } from "../pages/product/stores/reducer";
import { categoryReducer } from "../pages/category/stores/reducer";
import { brandReducer } from "../pages/brand/stores/reducer";
import { billReducer } from "../pages/bill/stores/reducer";
import { customerReducer } from "../pages/customer/stores/reducer";
import { staffReducer } from "../pages/staff/stores/reducer";
import { revenueReducer } from "../pages/revenue/stores/reducer";
import { profileReducer } from "../pages/profile/stores/reducer";
import { notificationReducer } from "../pages/notification/stores/reducer";
import { contactReducer } from "../pages/contact/stores/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modalReducer,
  errorReducer,
  homeReducer,
  productReducer,
  categoryReducer,
  brandReducer,
  billReducer,
  customerReducer,
  staffReducer,
  revenueReducer,
  profileReducer,
  notificationReducer,
  contactReducer,
});

export default rootReducer;
