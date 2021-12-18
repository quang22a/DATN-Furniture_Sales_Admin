import * as types from "./types";

const intialState = {
  listBills: null,
  errorGetList: null,
  msgGetList: null,
  bill: null,
  errorBill: null,
  msgBill: null,
  listProductBill: null,
  errorGetProduct: null,
  msgGetProduct: null,
  errorUpdate: null,
  msgUpdate: null,
  errorDelete: null,
  msgDelete: null,
};

export const billReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_BILLS_SUCCESS:
      return {
        ...state,
        listBills: action.payload.data,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_BILLS_FAIL:
      return {
        ...state,
        errorGetList: true,
        msgGetList: action.payload,
      };
    case types.GET_BILL_SUCCESS:
      return {
        ...state,
        bill: action.payload.data,
        errorBill: false,
        msgBill: null,
      };
    case types.GET_BILL_FAIL:
      return {
        ...state,
        errorBill: true,
        msgBill: action.payload,
      };
    case types.GET_BILL_PRODUCT_SUCCESS:
      return {
        ...state,
        listProductBill: action.payload.data,
        errorGetProduct: false,
        msgGetProduct: null,
      };
    case types.GET_BILL_PRODUCT_FAIL:
      return {
        ...state,
        errorGetProduct: true,
        msgGetProduct: action.payload,
      };
    case types.UPDATE_BILL_SUCCESS:
      return {
        ...state,
        errorUpdate: false,
        msgUpdate: null,
      };
    case types.UPDATE_BILL_FAIL:
      return {
        ...state,
        errorUpdate: true,
        msgUpdate: action.payload,
      };
    case types.DELETE_BILL_SUCCESS:
      return {
        ...state,
        errorDelete: false,
        msgDelete: null,
      };
    case types.DELETE_BILL_FAIL:
      return {
        ...state,
        errorDelete: true,
        msgDelete: action.payload,
      };
    default:
      return state;
  }
};
