import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const updateContact = (id, data) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.contact.list, id], data);
    dispatch({
      type: types.UPDATE_CONTACT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_CONTACT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.contact.list, id]);
    dispatch({
      type: types.DELETE_CONTACT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CONTACT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListContact =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.contact.list}?page=${page}${
          search ? `&search=${search}` : ""
        }`,
      ]);
      dispatch({
        type: types.GET_LIST_CONTACT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_LIST_CONTACT_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getDetailContact = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.contact.list, id]);
    dispatch({
      type: types.GET_DETAIL_CONTACT_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DETAIL_CONTACT_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
