import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { addStaff } from '../stores/action';
import { Input } from '../../../shared/components/partials/Input';
import { validateEmail, validatePhone } from '../../../shared/validate';

const AddStaff = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch(addStaff(data, navigate));
  };

  return (
    <div className='section-profile section-detail'>
      <div className='container'>
        <form className='profile' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-uppercase title-profile'>Thêm nhân viên</p>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Tên'
              placeholder='Nhập tên nhân viên'
              id='name'
              validate={register('name', {
                required: 'Bạn phải nhập tên nhân viên',
              })}
              errors={errors.name}
              para=''
            />
          </div>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Số điện thoại'
              placeholder='Nhập số điện thoại'
              validate={register('phone', { ...validatePhone })}
              errors={errors.phone}
              id='phone'
              para=''
            />
          </div>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Địa chỉ email'
              placeholder='Nhập địa chỉ email'
              id='email'
              validate={register('email', { ...validateEmail })}
              errors={errors.email}
              para=''
            />
          </div>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Địa chỉ'
              placeholder='Nhập địa chỉ'
              validate={register('address', {
                required: 'Bạn phải nhập địa chỉ',
              })}
              errors={errors.address}
              id='address'
              para=''
            />
          </div>
          <div className='form-row'>
            <Input
              type='password'
              className='form-control'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu'
              validate={register('password', {
                required: 'Bạn phải nhập mật khẩu',
              })}
              errors={errors.password}
              id='password'
              para=''
            />
          </div>
          <div className='action-profile'>
            <button type='submit' className='btn btn-primary'>
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
