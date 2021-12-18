import * as types from "./types";
import { ApiService } from "../../../core/services/api.service";
import { ENDPOINT } from "../../../../config/endpoint";

const http = new ApiService();

export const getRevenue = (data) => async (dispatch) => {
  try {
    const response = await http.get([`${ENDPOINT.revenue}`], data);
    dispatch({
      type: types.GET_REVENUE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_REVENUE_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
