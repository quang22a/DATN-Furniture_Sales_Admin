import * as types from "./types";

const intialState = {
  dataProfile: null,
  errorProfile: null,
  msgProfile: null,
  errorUpdateProfile: null,
  msgUpdateProfile: null,
  errorUpdatePassword: null,
  msgUpdatePassword: null,
};

export const profileReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        dataProfile: action.payload.user,
        errorProfile: false,
        msgProfile: null,
      };
    case types.GET_PROFILE_FAIL:
      return {
        ...state,
        errorProfile: true,
        msgProfile: action.payload,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        errorUpdateProfile: false,
        msgUpdateProfile: null,
      };
    case types.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        errorUpdateProfile: true,
        msgUpdateProfile: action.payload,
      };
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        errorUpdatePassword: false,
        msgUpdatePassword: null,
      };
    case types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        errorUpdatePassword: true,
        msgUpdatePassword: action.payload,
      };
    default:
      return state;
  }
};
