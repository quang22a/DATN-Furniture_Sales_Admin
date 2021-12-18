import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const getBills =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.bill.list}?page=${page}${
          search ? `&search=${search}` : ""
        }`,
      ]);
      dispatch({
        type: types.GET_BILLS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_BILLS_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailBill = (id) => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.bill.list}/${id}`]);
    dispatch({
      type: types.GET_BILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_BILL_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getProductOfBill = (billId) => async (dispatch) => {
  try {
    const response = await http.get([
      `${ENDPOINT.bill.index}-product/${billId}`,
    ]);
    dispatch({
      type: types.GET_BILL_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_BILL_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const updateBill = (billId, data) => async (dispatch) => {
  try {
    const response = await http.put([`${ENDPOINT.bill.list}/${billId}`], data);
    dispatch({
      type: types.UPDATE_BILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.UPDATE_BILL_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteBill = (billId) => async (dispatch) => {
  try {
    const response = await http.delete([`${ENDPOINT.bill.list}/${billId}`]);
    dispatch({
      type: types.DELETE_BILL_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.DELETE_BILL_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
