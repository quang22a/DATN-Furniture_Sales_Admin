import * as types from "./types";
import { AuthService } from "../../services/auth.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new AuthService();

export const login = (dataLogin) => async (dispatch) => {
  try {
    let response;
    if (dataLogin.email === "admin@gmail.com") {
      const newData = {
        username: dataLogin.email,
        password: dataLogin.password,
      };
      response = await http.signInAdmin(newData);
    } else {
      response = await http.signIn(dataLogin);
    }
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: error,
    });
  }
};
