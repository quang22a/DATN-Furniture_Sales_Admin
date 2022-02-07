import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMsg } from "../../../shared/components/partials/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setModal } from "../../../stores/modal/action";
import { addProduct } from "../stores/action";
import { getListBrandNotPag } from "../../brand/stores/action";
import { getListCategoryNotPag } from "../../category/stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { storage } from "../../../core/services/firebase.service";

const AddProduct = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [image, setImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listCategories = useSelector(
    (state) => state.categoryReducer.dataListNotPag
  );
  const listBrands = useSelector((state) => state.brandReducer.dataListNotPag);
  const error = useSelector((state) => state.productReducer.errorAdd);

  useEffect(() => {
    dispatch(getListCategoryNotPag());
    dispatch(getListBrandNotPag());
  }, []);

  const onSubmit = async (data) => {
    const dataAddProduct = {
      ...data,
      image,
      quantity: parseInt(data.quantity),
      price: parseInt(data.price),
    };
    if (!dataAddProduct.description) {
      delete dataAddProduct.description;
    }
    await dispatch(addProduct(dataAddProduct));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!error && isSubmit) {
      dispatch(
        setModal({
          key: "snapback",
          title: "",
          content: "Thêm thành công",
        })
      );
      navigate("/products");
    }
    setIsSubmit(false);
  }, [isSubmit]);

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const upImage = storage
        .ref(`images/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      upImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => setImage(url))
            .catch((error) => console.log("error:", error));
        }
      );
    }
  };

  return (
    <div className="section-profile">
      <div className="container">
        <form className="profile" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-uppercase title-profile">Thêm sản phẩm</p>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Tên"
              placeholder="Nhập tên sản phẩm"
              id="name"
              validate={register("name", {
                required: "Bạn phải nhập tên sản phẩm",
              })}
              errors={errors.name}
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Mô tả"
              placeholder="Nhập mô tả sản phẩm"
              validate={register("description")}
              errors={errors.description}
              id="description"
              para=""
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Danh mục</label>
              <select
                id="category"
                name="categoryId"
                className="form-control"
                placeholder="Chọn danh mục sản phẩm"
                {...register("categoryId", {
                  required: "Bạn phải chọn danh mục",
                })}
                errors={errors.categoryId}
              >
                {listCategories && listCategories.length
                  ? listCategories.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))
                  : ""}
              </select>
              {errors.phone && <ErrorMsg msg={errors.message} />}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Thương hiệu</label>
              <select
                id="brand"
                name="brandId"
                className="form-control"
                placeholder="Chọn thương hiệu sản phẩm"
                {...register("brandId", {
                  required: "Bạn phải chọn thương hiệu",
                })}
                errors={errors.brandId}
              >
                {listBrands && listBrands.length
                  ? listBrands.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.name}
                      </option>
                    ))
                  : ""}
              </select>
              {errors.phone && <ErrorMsg msg={errors.message} />}
            </div>
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Chất liệu"
              placeholder="Nhập chất liệu sản phẩm"
              id="material"
              validate={register("material", {
                required: "Bạn phải nhập chất liệu sản phẩm",
              })}
              errors={errors.material}
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Giá"
              placeholder="Nhập giá"
              id="price"
              validate={register("price", {
                required: "Bạn phải nhập giá",
              })}
              errors={errors.price}
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Số lượng"
              placeholder="Nhập số lượng"
              id="quantity"
              validate={register("quantity", {
                required: "Bạn phải nhập số lượng",
              })}
              errors={errors.quantity}
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Giảm giá"
              placeholder="Nhập giảm giá"
              id="discount"
              validate={register("discount", {
                required: "Bạn phải nhập giảm giá", min: { value: 0, message: "Phần trăm giảm giá phải lớn hơn hoặc bằng 0" }, max: { value: 100, message: "Phần trăm giảm giá phải nhỏ hơn hoặc bằng 100" },
              })}
              errors={errors.discount}
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="file"
              className="form-control"
              label=""
              placeholder=""
              id="image"
              validate={register("image", {
                required: "Bạn phải chọn ảnh",
              })}
              onChange={uploadImage}
              errors={errors.image}
              para=""
            />
          </div>
          <div className="action-profile">
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
