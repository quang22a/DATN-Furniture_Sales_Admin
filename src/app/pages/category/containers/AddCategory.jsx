import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { addCategory } from '../stores/action';
import { Input } from '../../../shared/components/partials/Input';
import { storage } from '../../../core/services/firebase.service';

const AddCategory = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const dataAdd = {
      ...data,
      image,
    };
    dispatch(addCategory(dataAdd, navigate));
  };

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const upImage = storage
        .ref(`images-category/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      upImage.on(
        'state_changed',
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref('images-category')
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => setImage(url))
            .catch((error) => console.log('error:', error));
        }
      );
    }
  };

  return (
    <div className='section-profile section-detail'>
      <div className='container'>
        <form className='profile' onSubmit={handleSubmit(onSubmit)}>
          <p className='text-uppercase title-profile'>Thêm danh mục</p>
          <div className='form-row'>
            <Input
              type='text'
              className='form-control'
              label='Tên'
              placeholder='Nhập tên danh mục'
              id='name'
              validate={register('name', {
                required: 'Bạn phải nhập tên danh mục',
              })}
              errors={errors.name}
              para=''
            />
          </div>
          <div className='form-row'>
            <Input
              type='file'
              className='form-control'
              label=''
              placeholder=''
              id='image'
              validate={register('image', {
                required: 'Bạn phải chọn ảnh',
              })}
              onChange={uploadImage}
              errors={errors.image}
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

export default AddCategory;
