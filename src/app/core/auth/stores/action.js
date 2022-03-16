import * as types from './types';
import { AuthService } from '../../services/auth.service';
import { setModal } from '../../../stores/modal/action';

const http = new AuthService();

export const login = (dataLogin, navigate) => async (dispatch) => {
  try {
    let response;
    if (dataLogin.email === 'admin@gmail.com') {
      const newData = {
        username: dataLogin.email,
        password: dataLogin.password,
      };
      response = await http.signInAdmin(newData);
    } else {
      response = await http.signIn(dataLogin);
    }
    if (response?.role === 'customer') {
      dispatch(
        setModal({
          key: 'error',
          title: 'Error',
          content: 'Tài khoản hoặc mật khẩu không chính xác',
        })
      );
    } else {
      dispatch(
        setModal({
          key: 'snapback',
          title: '',
          content: 'Đăng nhập thành công',
        })
      );
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response,
      });
      navigate('/');
    }
  } catch (error) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: error,
    });
  }
};
