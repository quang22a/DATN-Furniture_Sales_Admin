import { SET_ERROR_NULL } from "./type";

const initialState = {
  error: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case SET_ERROR_NULL:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return { ...state };
  }
};
