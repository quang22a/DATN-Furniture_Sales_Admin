import * as types from "./types";

const intialState = {
  dataList: null,
  dataDetail: null,
  errorUpdate: null,
  msgUpdate: null,
  errorDelete: null,
  msgDelete: null,
  errorGetList: null,
  msgGetList: null,
  errorGetDetail: null,
  msgGetDetail: null,
};

export const contactReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        errorUpdate: false,
        msgUpdate: null,
      };
    case types.UPDATE_CONTACT_FAIL:
      return {
        ...state,
        errorUpdate: true,
        msgUpdate: action.payload,
      };
    case types.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        errorDelete: false,
        msgDelete: null,
      };
    case types.DELETE_CONTACT_FAIL:
      return {
        ...state,
        errorDelete: true,
        msgDelete: action.payload,
      };
    case types.GET_LIST_CONTACT_SUCCESS:
      return {
        ...state,
        dataList: action.payload.data,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_LIST_CONTACT_FAIL:
      return {
        ...state,
        errorGetList: true,
        msgGetList: action.payload,
      };
    case types.GET_DETAIL_CONTACT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        errorGetDetail: false,
        msgGetDetail: null,
      };
    case types.GET_DETAIL_CONTACT_FAIL:
      return {
        ...state,
        errorGetDetail: true,
        msgGetDetail: action.payload,
      };
    default:
      return state;
  }
};
