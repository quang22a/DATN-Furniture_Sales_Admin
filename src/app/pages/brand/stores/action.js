import * as types from './types';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { setModal } from '../../../stores/modal/action';

const http = new ApiService();

export const addBrand = (data, navigate) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.brand.index], data);
    dispatch({
      type: types.ADD_BRAND_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: 'snapback',
        title: '',
        content: 'Thêm thành công',
      })
    );
    navigate('/brands');
  } catch (error) {
    dispatch({
      type: types.ADD_BRAND_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const editBrand = (id, data, navigate) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.brand.list, id], data);
    dispatch({
      type: types.EDIT_BRAND_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: 'snapback',
        title: '',
        content: 'Sửa thông tin thương hiệu thành công',
      })
    );
    navigate(`/brands/${id}`);
  } catch (error) {
    dispatch({
      type: types.EDIT_BRAND_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.brand.list, id]);
    dispatch({
      type: types.DELETE_BRAND_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_BRAND_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListBrand =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.brand.list}-admin?page=${page}${
          search ? `&search=${search}` : ''
        }`,
      ]);
      dispatch({
        type: types.GET_LIST_BRAND_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_LIST_BRAND_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getListBrandNotPag = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.brand.list]);
    dispatch({
      type: types.GET_LIST_BRAND_NOT_PAG_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_LIST_BRAND_NOT_PAG_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getDetailBrand = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.brand.list, id]);
    dispatch({
      type: types.GET_DETAIL_BRAND_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DETAIL_BRAND_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
