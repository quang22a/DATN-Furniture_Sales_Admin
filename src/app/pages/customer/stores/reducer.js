import * as types from "./types";

const intialState = {
  dataList: null,
  dataDetail: null,
  errorAdd: null,
  msgAdd: null,
  errorEdit: null,
  msgEdit: null,
  errorDelete: null,
  msgDelete: null,
  errorGetList: null,
  msgGetList: null,
  errorGetDetail: null,
  msgGetDetail: null,
};

export const customerReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        errorAdd: false,
        msgAdd: null,
      };
    case types.ADD_CUSTOMER_FAIL:
      return {
        ...state,
        errorAdd: true,
        msgAdd: action.payload,
      };
    case types.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        errorEdit: false,
        msgEdit: null,
      };
    case types.UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        errorEdit: true,
        msgEdit: action.payload,
      };
    case types.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        errorDelete: false,
        msgDelete: null,
      };
    case types.DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        errorDelete: true,
        msgDelete: action.payload,
      };
    case types.GET_LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        dataList: action.payload.data,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_LIST_CUSTOMER_FAIL:
      return {
        ...state,
        errorGetList: true,
        msgGetList: action.payload,
      };
    case types.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        errorGetDetail: false,
        msgGetDetail: null,
      };
    case types.GET_CUSTOMER_FAIL:
      return {
        ...state,
        errorGetDetail: true,
        msgGetDetail: action.payload,
      };
    default:
      return state;
  }
};
