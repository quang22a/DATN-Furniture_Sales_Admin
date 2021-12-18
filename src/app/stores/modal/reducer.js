import * as types from "./types";

const intialState = {
  msg: null,
};

export const modalReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.SET_MODAL_NULL:
      localStorage.removeItem("dataDrapLocal");
      return {
        ...state,
        msg: null,
      };
    case types.SET_MODAL:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};
