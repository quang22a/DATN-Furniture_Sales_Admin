import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const addNotification = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.notification.index], data);
    dispatch({
      type: types.ADD_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_NOTIFICATION_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const editNotification = (id, data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.notification.list, id], data);
    dispatch({
      type: types.EDIT_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.EDIT_NOTIFICATION_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.notification.list, id]);
    dispatch({
      type: types.DELETE_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_NOTIFICATION_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListNotification =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.notification.list}-admin?page=${page}${
          search ? `&search=${search}` : ""
        }`,
      ]);
      dispatch({
        type: types.GET_NOTIFICATIONS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_NOTIFICATIONS_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailNotification = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.notification.list, id]);
    dispatch({
      type: types.GET_NOTIFICATION_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_NOTIFICATION_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
