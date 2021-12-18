import * as types from "./types";

const intialState = {
  data: null,
  error: null,
  msg: null,
};

export const revenueReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_REVENUE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        msg: null,
      };
    case types.GET_REVENUE_FAIL:
      return {
        ...state,
        error: true,
        msg: action.payload,
      };
    default:
      return state;
  }
};
