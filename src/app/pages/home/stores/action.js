import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const countCustomer = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.customer.list}-count`]);
    dispatch({
      type: types.COUNT_CUSTOMER_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.COUNT_CUSTOMER_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const countStaff = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.staff.list}-count`]);
    dispatch({
      type: types.COUNT_STAFF_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.COUNT_STAFF_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const countProduct = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.product.list}-count`]);
    dispatch({
      type: types.COUNT_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.COUNT_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const countProductSale = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.product.list}-count-sale`]);
    dispatch({
      type: types.COUNT_PRODUCT_SALE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.COUNT_PRODUCT_SALE_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getProductHot = () => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.product.list}-hot`]);
    dispatch({
      type: types.GET_PRODUCT_HOT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_PRODUCT_HOT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
