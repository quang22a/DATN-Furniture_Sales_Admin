import { SET_ERROR_NULL } from './type';

export const setErrorNull = () => {
  return {
    type: SET_ERROR_NULL,
    payload: {
      error: null
    }
  }
}
