import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';

import { getDetailCategory, editCategory } from '../stores/action';
import { Input } from '../../../shared/components/partials/Input';
import { storage } from '../../../core/services/firebase.service';
import Switch from '@mui/material/Switch';

const UpdateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [isTrending, setIsTrending] = useState(false);
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryDetail = useSelector(
    (state) => state.categoryReducer.dataDetail
  );
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailCategory(id));
      setIsData(true);
    };
    getData();
  }, []);

  useEffect(() => {
    if (categoryDetail) {
      setIsTrending(categoryDetail.isTrending);
      setImage(categoryDetail.image);
    }
  }, [categoryDetail]);

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

  const onSubmit = async (data) => {
    dispatch(
      editCategory(
        categoryDetail?._id,
        { ...data, image, isTrending },
        navigate
      )
    );
  };

  return (
    <section className='section-product-detail'>
      <div className='container'>
        <p className='title text-uppercase'>Sửa thông tin danh mục</p>
        {categoryDetail && isData ? (
          <form
            className='product-detail row'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='col-6 product-detail-img'>
              <img src={image} alt={categoryDetail?.name} />
              <Input
                type='file'
                className='form-control'
                label=''
                placeholder=''
                id='image'
                onChange={uploadImage}
                para=''
              />
            </div>
            <div className='col-6'>
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
                  defaultValue={categoryDetail?.name}
                  errors={errors.name}
                  para=''
                />
              </div>
              <div className='form-row'>
                <label htmlFor=''>Nổi bật</label>
                <Switch
                  {...label}
                  style={{ textAlign: 'center' }}
                  checked={isTrending}
                  onChange={() => {
                    setIsTrending(!isTrending);
                  }}
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
            </div>
          </form>
        ) : (
          ''
        )}
      </div>
    </section>
  );
};

export default UpdateCategory;
