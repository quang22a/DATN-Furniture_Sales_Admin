import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { Input } from '../../../shared/components/partials/Input';
import { updateProfile } from '../stores/action';
import { validatePhone } from '../../../shared/validate';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const profileUser = useSelector((state) => state.profileReducer.dataProfile);

  useEffect(() => {
    setValue('name', profileUser?.name);
    setValue('phone', profileUser?.phone);
    setValue('address', profileUser?.address);
  }, [profileUser]);

  const onSubmit = (data) => {
    dispatch(updateProfile({ ...data, email: profileUser?.email }, navigate));
  };

  return (
    <div className='section-profile'>
      <div className='container'>
        <form className='profile' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-uppercase title-profile'>
            Cập nhật thông tin cá nhân
          </p>
          <div className='form-row form-email'>
            <p>
              Địa chỉ email <span>{profileUser?.email}</span>
            </p>
          </div>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Họ tên'
              placeholder={'Họ tên'}
              id={'name'}
              validate={register('name', {
                required: 'Bạn phải nhập họ tên',
              })}
              errors={errors.name}
              para={''}
            />
          </div>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Số điện thoại'
              placeholder={'Số điện thoại'}
              id={'phone'}
              validate={register('phone', { ...validatePhone })}
              errors={errors.phone}
              para={''}
            />
          </div>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Địa chỉ'
              placeholder={'Địa chỉ'}
              id={'address'}
              validate={register('address', {
                required: 'Bạn phải nhập địa chỉ',
              })}
              errors={errors.address}
              para={''}
            />
          </div>
          <div className='action-profile'>
            <button type='submit' className='btn btn-primary'>
              Cập nhật
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

export default UpdateProfile;
