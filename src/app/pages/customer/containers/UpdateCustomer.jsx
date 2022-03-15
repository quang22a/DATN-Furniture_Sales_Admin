import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

import { getDetailCustomer, updateCustomer } from '../stores/action';
import { Input } from '../../../shared/components/partials/Input';
import Switch from '@mui/material/Switch';
import { validatePhone } from '../../../shared/validate';

const UpdateCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isActive, setIsActive] = useState(false);
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerDetail = useSelector(
    (state) => state.customerReducer.dataDetail
  );
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailCustomer(id));
      setIsData(true);
    };
    getData();
  }, []);

  useEffect(() => {
    if (customerDetail) {
      setIsActive(customerDetail.isActive);
    }
  }, [customerDetail]);

  const onSubmit = (data) => {
    dispatch(
      updateCustomer(
        customerDetail?._id,
        {
          ...data,
          email: customerDetail?.email,
          isActive: isActive,
        },
        navigate
      )
    );
  };

  return (
    <section className='section-profile section-detail'>
      <div className='container'>
        <p className='title-profile text-uppercase'>
          Cập nhật thông tin thành viên
        </p>
        {customerDetail && isData ? (
          <form className='profile' onSubmit={handleSubmit(onSubmit)}>
            <div className='form-row form-detail'>
              <p>Địa chỉ email:</p>
              <p>{customerDetail?.email}</p>
            </div>
            <div className='form-row'>
              <Input
                type='text'
                className='form-control'
                label='Họ tên'
                placeholder='Nhập tên'
                id='name'
                validate={register('name', {
                  required: 'Bạn phải nhập họ tên',
                })}
                defaultValue={customerDetail?.name}
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
                id='phone'
                validate={register('phone', { ...validatePhone })}
                defaultValue={customerDetail?.phone}
                errors={errors.phone}
                para=''
              />
            </div>
            <div className='form-row'>
              <Input
                type='text'
                className='form-control'
                label='Địa chỉ'
                placeholder='Nhập địa chỉ'
                id='address'
                validate={register('address', {
                  required: 'Bạn phải nhập địa chỉ',
                })}
                defaultValue={customerDetail?.address}
                errors={errors.address}
                para=''
              />
            </div>
            <div className='form-row'>
              <label htmlFor=''>Trạng thái</label>
              <Switch
                {...label}
                style={{ textAlign: 'center' }}
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
            </div>
            <div className='action-edit'>
              <button type='submit' className='btn btn-primary'>
                Lưu
              </button>
              <button
                type='button'
                className='btn btn-black'
                onClick={() => navigate(-1)}
              >
                Quay lại
              </button>
            </div>
          </form>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export default UpdateCustomer;
