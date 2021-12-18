import { AuthStorageService } from "../../services/authStorage.service";
import * as types from "./types";

const storage = new AuthStorageService();
const intialState = {
  token: storage.getToken() ? storage.getToken() : null,
  errorLogin: null,
  data: null,
  msg: null,
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      if (action.payload.role === "admin") {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            role: "admin",
            name: "admin",
            img: "",
          })
        );
      } else {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            role: action.payload.role,
            name: action.payload.name,
            img: action.payload.image,
            userId: action.payload.userId,
          })
        );
      }
      storage.setToken(action.payload.accessToken);
      return {
        ...state,
        token: action.payload.accessToken,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        errorLogin: true,
        msg: action.payload,
      };
    default:
      return state;
  }
};
