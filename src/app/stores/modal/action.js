import * as types from "./types";

export const closeModal = () => {
  return {
    type: types.SET_MODAL_NULL,
    payload: {},
  };
};
export const setModal = (data) => {
  return {
    type: types.SET_MODAL,
    payload: data,
  };
};
