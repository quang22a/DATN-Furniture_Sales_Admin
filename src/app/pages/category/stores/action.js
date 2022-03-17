import * as types from './types';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { setModal } from '../../../stores/modal/action';

const http = new ApiService();

export const addCategory = (data, navigate) => async (dispatch) => {
  try {
    const response = await http.post([ENDPOINT.category.index], data);
    dispatch({
      type: types.ADD_CATEGORY_SUCCESS,
      payload: response,
    });
    dispatch(
      setModal({
        key: 'snapback',
        title: '',
        content: 'Thêm thành công',
      })
    );
    navigate('/categories');
  } catch (error) {
    dispatch({
      type: types.ADD_CATEGORY_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const editCategory = (id, data, navigate) => async (dispatch) => {
  try {
    const response = await http.put([ENDPOINT.category.list, id], data);
    dispatch({
      type: types.EDIT_CATEGORY_SUCCESS,
      payload: response,
    });
    if (navigate) {
      dispatch(
        setModal({
          key: 'snapback',
          title: '',
          content: 'Sửa thông tin danh mục thành công',
        })
      );
      navigate(`/categories/${id}`);
    }
  } catch (error) {
    dispatch({
      type: types.EDIT_CATEGORY_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await http.delete([ENDPOINT.category.list, id]);
    dispatch({
      type: types.DELETE_CATEGORY_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_CATEGORY_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getListCategory =
  (page = 1, search) =>
  async (dispatch) => {
    try {
      const response = await http.get([
        `${ENDPOINT.category.list}-admin?page=${page}${
          search ? `&search=${search}` : ''
        }`,
      ]);
      dispatch({
        type: types.GET_LIST_CATEGORY_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: types.GET_LIST_CATEGORY_FAIL,
        payload: {
          error: {
            title: error.name,
            content: error?.response?.data?.msg || error?.msg,
          },
        },
      });
    }
  };

export const getListCategoryNotPag = () => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.category.list]);
    dispatch({
      type: types.GET_LIST_CATEGORY_NOT_PAG_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_LIST_CATEGORY_NOT_PAG_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};

export const getDetailCategory = (id) => async (dispatch) => {
  try {
    const response = await http.get([ENDPOINT.category.list, id]);
    dispatch({
      type: types.GET_DETAIL_CATEGORY_SUCCESS,
      payload: response,
    });
  } catch (error) {
    dispatch({
      type: types.GET_DETAIL_CATEGORY_FAIL,
      payload: {
        error: {
          title: error.name,
          content: error?.response?.data?.msg || error?.msg,
        },
      },
    });
  }
};
