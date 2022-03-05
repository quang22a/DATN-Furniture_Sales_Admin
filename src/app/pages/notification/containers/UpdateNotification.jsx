import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { setModal } from "../../../stores/modal/action";
import { getDetailNotification, editNotification } from "../stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { storage } from "../../../core/services/firebase.service";

const NotificationDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationDetail = useSelector(
    (state) => state.notificationReducer.dataDetail
  );
  const error = useSelector(
    (state) => state.notificationReducer.errorGetDetail
  );

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailNotification(id));
      setIsData(true);
    };
    getData();
  }, []);

  useEffect(() => {
    if (notificationDetail) {
      setImage(notificationDetail.image);
    }
  }, [notificationDetail]);

  const uploadImage = (e) => {
    if (e.target.files[0]) {
      const upImage = storage
        .ref(`images-notification/${e.target.files[0].name}`)
        .put(e.target.files[0]);
      upImage.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images-notification")
            .child(e.target.files[0].name)
            .getDownloadURL()
            .then((url) => setImage(url))
            .catch((error) => console.log("error:", error));
        }
      );
    }
  };

  const onSubmit = async (data) => {
    await dispatch(
      editNotification(notificationDetail?._id, { ...data, image })
    );
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!error && isSubmit) {
      dispatch(
        setModal({
          key: "snapback",
          title: "",
          content: "Sửa thông báo thành công",
        })
      );
      navigate(`/notifications/${id}`);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <section className="section-product-detail">
      <div className="container">
        <p className="title text-uppercase">Sửa thông báo</p>
        {notificationDetail && isData ? (
          <form
            className="product-detail row"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="col-6 product-detail-img">
              <img src={image} alt={notificationDetail?.name} />
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
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề"
                  id="title"
                  validate={register("title", {
                    required: "Bạn phải nhập tiêu đề",
                  })}
                  defaultValue={notificationDetail?.title}
                  errors={errors.title}
                  para=""
                />
              </div>
              <div className="form-row">
                <Input
                  type="text"
                  className="form-control"
                  label="Nội dung"
                  placeholder="Nhập nội dung"
                  id="content"
                  validate={register("content", {
                    required: "Bạn phải nhập nội dung",
                  })}
                  defaultValue={notificationDetail?.content}
                  errors={errors.content}
                  para=""
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

export default NotificationDetail;
