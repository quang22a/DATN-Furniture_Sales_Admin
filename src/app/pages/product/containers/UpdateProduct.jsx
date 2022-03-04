import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { setModal } from "../../../stores/modal/action";
import { ErrorMsg } from "../../../shared/components/partials/ErrorMsg";
import { editProduct, getDetailProduct } from "../stores/action";
import { getListBrandNotPag } from "../../brand/stores/action";
import { getListCategoryNotPag } from "../../category/stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { storage } from "../../../core/services/firebase.service";
import Switch from "@mui/material/Switch";

const UpdateProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isActive, setIsActive] = useState(false);
  const [isData, setIsData] = useState(false);
  const [image, setImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetail = useSelector((state) => state.productReducer.dataDetail);
  const error = useSelector((state) => state.productReducer.errorGetDetail);
  const listCategories = useSelector(
    (state) => state.categoryReducer.dataListNotPag
  );
  const listBrands = useSelector((state) => state.brandReducer.dataListNotPag);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getListCategoryNotPag());
      await dispatch(getListBrandNotPag());
      await dispatch(getDetailProduct(id));
      setIsData(true);
    };
    getData();
  }, []);

  useEffect(() => {
    if (productDetail) {
      setIsActive(productDetail.isActive);
      setImage(productDetail.image);
    }
  }, [productDetail]);

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const upImage = storage
        .ref(`images-category/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      upImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images-category")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => setImage(url))
            .catch((error) => console.log("error:", error));
        }
      );
    }
  };

  const onSubmit = async (data) => {
    const dataSubmit = { ...data, image, isActive };
    if (!data.description) {
      delete dataSubmit.description;
    }
    await dispatch(editProduct(productDetail?._id, dataSubmit));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!error && isSubmit) {
      dispatch(
        setModal({
          key: "snapback",
          title: "",
          content: "Sửa thông tin sản phẩm thành công",
        })
      );
      navigate(`/products/${id}`);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <section className="section-product-detail">
      <div className="container">
        <p className="title text-uppercase">Sửa thông tin sản phẩm</p>
        {isData && listCategories && listBrands ? (
          <>
            <form
              className="product-detail row"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="col-6 product-detail-img">
                <img src={image} alt={productDetail.name} />
                <Input
                  type="file"
                  className="form-control"
                  label=""
                  placeholder=""
                  id="image"
                  onChange={uploadImage}
                  errors={errors.image}
                  para=""
                />
              </div>
              <div className="col-6">
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
                    defaultValue={productDetail.name}
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
                    defaultValue={productDetail.description}
                    errors={errors.description}
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
                      defaultValue={
                        listCategories?.find(
                          (item) => item._id === productDetail.categoryId
                        )._id
                      }
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
                      defaultValue={
                        listBrands?.find(
                          (item) => item._id === productDetail.brandId
                        )._id
                      }
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
                    defaultValue={productDetail.material}
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
                    defaultValue={productDetail.price}
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
                    defaultValue={productDetail.quantity}
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
                    defaultValue={productDetail.discount}
                    errors={errors.discount}
                    para=""
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="">Trạng thái</label>
                  <Switch
                    {...label}
                    style={{ textAlign: "center" }}
                    checked={isActive}
                    onChange={() => {
                      setIsActive(!isActive);
                    }}
                  />
                </div>
                <div className="action-profile action-edit">
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                  <button
                    type="button"
                    className="btn btn-black"
                    onClick={() => navigate(-1)}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default UpdateProduct;
