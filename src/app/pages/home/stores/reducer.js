import * as types from "./types";

const intialState = {
  countCustomer: null,
  errorCustomer: null,
  msgCustomer: null,
  countStaff: null,
  errorStaff: null,
  msgStaff: null,
  countProduct: null,
  errorProduct: null,
  msgProduct: null,
  countProductSale: null,
  errorProductSale: null,
  msgProductSale: null,
  productHot: null,
  errorProductHot: null,
  msgProductHot: null,
};

export const homeReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.COUNT_CUSTOMER_SUCCESS:
      return {
        ...state,
        countCustomer: action.payload.data,
        errorCustomer: false,
        msgCustomer: null,
      };
    case types.COUNT_CUSTOMER_FAIL:
      return {
        ...state,
        errorCustomer: true,
        msgCustomer: action.payload,
      };
    case types.COUNT_STAFF_SUCCESS:
      return {
        ...state,
        countStaff: action.payload.data,
        errorStaff: false,
        msgStaff: null,
      };
    case types.COUNT_STAFF_FAIL:
      return {
        ...state,
        errorStaff: true,
        msgStaff: action.payload,
      };
    case types.COUNT_PRODUCT_SUCCESS:
      return {
        ...state,
        countProduct: action.payload.data,
        errorProduct: false,
        msgProduct: null,
      };
    case types.COUNT_PRODUCT_FAIL:
      return {
        ...state,
        errorProduct: true,
        msgProduct: action.payload,
      };
    case types.COUNT_PRODUCT_SALE_SUCCESS:
      return {
        ...state,
        countProductSale: action.payload.data,
        errorProductSale: false,
        msgProductSale: null,
      };
    case types.COUNT_PRODUCT_SALE_FAIL:
      return {
        ...state,
        errorProductSale: true,
        msgProductSale: action.payload,
      };
    case types.GET_PRODUCT_HOT_SUCCESS:
      return {
        ...state,
        productHot: action.payload.data,
        errorProductHot: false,
        msgProductHot: null,
      };
    case types.GET_PRODUCT_HOT_FAIL:
      return {
        ...state,
        errorProductHot: true,
        msgProductHot: action.payload,
      };
    default:
      return state;
  }
};
