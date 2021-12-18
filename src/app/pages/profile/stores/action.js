import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";
import { setModal } from "../../../stores/modal/action";

const http = new ApiService();

export const getProfile = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.auth.profile]);
    dispatch({
      type: types.GET_PROFILE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PROFILE_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.auth.profile], data);
    dispatch({
      type: types.UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Cập nhật thông tin cá nhân thành công",
      })
    );
  } catch (error) {
    dispatch({
      type: types.UPDATE_PROFILE_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.auth.updatePassword], data);
    dispatch({
      type: types.UPDATE_PASSWORD_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Đổi mật khẩu thành công",
      })
    );
  } catch (error) {
    dispatch({
      type: types.UPDATE_PASSWORD_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
