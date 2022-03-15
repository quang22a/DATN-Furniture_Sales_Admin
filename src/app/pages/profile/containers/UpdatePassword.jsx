import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { Input } from '../../../shared/components/partials/Input';
import { updatePassword } from '../stores/action';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch('newPassword', '');

  const onSubmit = (data) => {
    dispatch(updatePassword(data, navigate));
  };

  return (
    <div className='section-profile'>
      <div className='container'>
        <form className='profile' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-uppercase title-profile'>Đổi mật khẩu</p>
          <div className='form-row'>
            <Input
              type='password'
              className='form-control'
              label='Mật khẩu cũ'
              placeholder={'Nhập mật khẩu cũ'}
              id={'password'}
              validate={register('password', {
                required: 'Bạn phải nhập mật khẩu cũ',
              })}
              errors={errors.password}
              para={''}
            />
          </div>
          <div className='form-row'>
            <Input
              type='password'
              className='form-control'
              label='Mật khẩu mới'
              placeholder={'Nhập mật khẩu mới'}
              id={'new-password'}
              validate={register('newPassword', {
                required: 'Bạn phải nhập mật khẩu mới',
              })}
              errors={errors.newPassword}
              para={''}
            />
          </div>
          <div className='form-row'>
            <Input
              type='password'
              className='form-control'
              label='Nhập lại mật khẩu mới'
              placeholder={'Nhập lại mật khẩu mới'}
              id={'repeat-password'}
              validate={register('repeatPassword', {
                required: 'Bạn phải nhập lại mật khẩu mới',
                validate: (value) =>
                  value === newPassword.current ||
                  'Mật khẩu mới không trùng khớp',
              })}
              errors={errors.repeatPassword}
              para={''}
            />
          </div>
          <div className='action-profile'>
            <button type='submit' className='btn btn-primary'>
              Đổi mật khẩu
            </button>
            <Link to='/profile' className='btn btn-black'>
              Quay lại
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
