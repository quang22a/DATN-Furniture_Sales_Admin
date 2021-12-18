import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const addProduct = (data) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.product.index], data);
    dispatch({
      type: types.ADD_NEW_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.ADD_NEW_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const editProduct = (id, data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.product.list, id], data);
    dispatch({
      type: types.EDIT_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.EDIT_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.product.list, id]);
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListProduct =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.product.list}?page=${page}${
          search ? `&search=${search}` : ""
        }`,
      ]);
      dispatch({
        type: types.GET_LIST_PRODUCT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_LIST_PRODUCT_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.product.list, id]);
    dispatch({
      type: types.GET_DETAIL_PRODUCT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DETAIL_PRODUCT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getRatings =
  (productId, page = 1) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.rating.list}/${productId}?page=${page}`,
      ]);
      dispatch({
        type: types.GET_RATINGS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_RATINGS_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };
