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
  listRatings: null,
  errorListRating: null,
  msgListRating: null,
};

export const productReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.ADD_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        errorAdd: false,
        msgAdd: null,
      };
    case types.ADD_NEW_PRODUCT_FAIL:
      return {
        ...state,
        errorAdd: true,
        msgAdd: action.payload,
      };
    case types.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        errorEdit: false,
        msgEdit: null,
      };
    case types.EDIT_PRODUCT_FAIL:
      return {
        ...state,
        errorEdit: true,
        msgEdit: action.payload,
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        errorDelete: false,
        msgDelete: null,
      };
    case types.DELETE_PRODUCT_FAIL:
      return {
        ...state,
        errorDelete: true,
        msgDelete: action.payload,
      };
    case types.GET_LIST_PRODUCT_SUCCESS:
      return {
        ...state,
        dataList: action.payload.data,
        errorGetList: false,
        msgGetList: null,
      };
    case types.GET_LIST_PRODUCT_FAIL:
      return {
        ...state,
        errorGetList: true,
        msgGetList: action.payload,
      };
    case types.GET_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        dataDetail: action.payload.data,
        errorGetDetail: false,
        msgGetDetail: null,
      };
    case types.GET_DETAIL_PRODUCT_FAIL:
      return {
        ...state,
        errorGetDetail: true,
        msgGetDetail: action.payload,
      };
    case types.GET_RATINGS_SUCCESS:
      return {
        ...state,
        listRatings: action.payload.data,
        errorListRating: false,
        msgListRating: null,
      };
    case types.GET_RATINGS_FAIL:
      return {
        ...state,
        errorListRating: true,
        msgListRating: action.payload,
      };
    default:
      return state;
  }
};
