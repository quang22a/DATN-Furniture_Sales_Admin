import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { getDetailBrand, editBrand } from "../stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { storage } from "../../../core/services/firebase.service";
import Switch from "@mui/material/Switch";

const UpdateBrand = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brandDetail = useSelector((state) => state.brandReducer.dataDetail);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailBrand(id));
      setIsData(true);
    };
    getData();
  }, []);

  useEffect(() => {
    if (brandDetail) {
      setIsFeatured(brandDetail.isFeatured);
      setImage(brandDetail.image);
    }
  }, [brandDetail]);

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const upImage = storage
        .ref(`images-brand/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      upImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images-brand")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => setImage(url))
            .catch((error) => console.log("error:", error));
        }
      );
    }
  };

  const onSubmit = (data) => {
    dispatch(editBrand(brandDetail?._id, { ...data, image, isFeatured }, navigate));
  };

  return (
    <section className="section-product-detail">
      <div className="container">
        <p className="title text-uppercase">Sửa thông tin thương hiệu</p>
        {brandDetail && isData ? (
          <form
            className="product-detail row"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-6 product-detail-img">
              <img src={image} alt={brandDetail?.name} />
              <Input
                type="file"
                className="form-control"
                label=""
                placeholder=""
                id="image"
                onChange={uploadImage}
                para=""
              />
            </div>
            <div className="col-6">
              <div className="form-row">
                <Input
                  type="text"
                  className="form-control"
                  label="Tên"
                  placeholder="Nhập tên thương hiệu"
                  id="name"
                  validate={register("name", {
                    required: "Bạn phải nhập tên thương hiệu",
                  })}
                  defaultValue={brandDetail?.name}
                  errors={errors.name}
                  para=""
                />
              </div>
              <div className="form-row">
                <label htmlFor="">Xu hướng</label>
                <Switch
                  {...label}
                  style={{ textAlign: "center" }}
                  checked={isFeatured}
                  onChange={() => {
                    setIsFeatured(!isFeatured);
                  }}
                />
              </div>
              <div className="action-edit">
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
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default UpdateBrand;
