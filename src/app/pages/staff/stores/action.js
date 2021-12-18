import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";
import { setModal } from "../../../stores/modal/action";

const http = new ApiService();

export const addStaff = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.auth.registerStaff], data);
    dispatch({
      type: types.ADD_STAFF_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: "snapback",
        title: "",
        content: "Thêm thành công",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.ADD_STAFF_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updateStaff = (id, data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.staff.list, id], data);
    dispatch({
      type: types.UPDATE_STAFF_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_STAFF_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteStaff = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.staff.list, id]);
    dispatch({
      type: types.DELETE_STAFF_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_STAFF_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListStaff =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.staff.list}?page=${page}${
          search ? `&search=${search}` : ""
        }`,
      ]);
      dispatch({
        type: types.GET_LIST_STAFF_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_LIST_STAFF_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailStaff = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.staff.list, id]);
    dispatch({
      type: types.GET_STAFF_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_STAFF_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
