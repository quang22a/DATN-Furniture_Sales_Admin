import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const addCustomer = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.customer.index], data);
    dispatch({
      type: types.ADD_CUSTOMER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_CUSTOMER_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updateCustomer = (id, data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.customer.list, id], data);
    dispatch({
      type: types.UPDATE_CUSTOMER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_CUSTOMER_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.customer.list, id]);
    dispatch({
      type: types.DELETE_CUSTOMER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CUSTOMER_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListCustomer =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.customer.list}?page=${page}${
          search ? `&search=${search}` : ""
        }`,
      ]);
      dispatch({
        type: types.GET_LIST_CUSTOMER_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_LIST_CUSTOMER_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailCustomer = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.customer.list, id]);
    dispatch({
      type: types.GET_CUSTOMER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_CUSTOMER_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
