import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { setModal } from "../../../stores/modal/action";
import { getDetailStaff, updateStaff } from "../stores/action";
import { Input } from "../../../shared/components/partials/Input";
import Switch from "@mui/material/Switch";

const UpdateStaff = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffDetail = useSelector((state) => state.staffReducer.dataDetail);
  const error = useSelector((state) => state.staffReducer.errorGetDetail);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailStaff(id));
      setIsData(true);
    };
    getData();
  }, []);

  useEffect(() => {
    if (staffDetail) {
      setIsActive(staffDetail.isActive);
    }
  }, [staffDetail]);

  const onSubmit = async (data) => {
    await dispatch(
      updateStaff(staffDetail?._id, {
        ...data,
        email: staffDetail?.email,
        isActive: isActive,
      })
    );
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!error && isSubmit) {
      dispatch(
        setModal({
          key: "snapback",
          title: "",
          content: "Sửa thông tin nhân viên thành công",
        })
      );
      navigate(`/staffs/${id}`);
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <section className="section-profile">
      <div className="container">
        <p className="title-profile">Cập nhật thông tin nhân viên</p>
        {staffDetail && isData ? (
          <form className="profile" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row form-detail">
              <p>Địa chỉ email:</p>
              <p>{staffDetail?.email}</p>
            </div>
            <div className="form-row">
              <Input
                type="text"
                className="form-control"
                label="Họ tên"
                placeholder="Nhập tên"
                id="name"
                validate={register("name", {
                  required: "Bạn phải nhập họ tên",
                })}
                defaultValue={staffDetail?.name}
                errors={errors.name}
                para=""
              />
            </div>
            <div className="form-row">
              <Input
                type="text"
                className="form-control"
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                id="phone"
                validate={register("phone", {
                  required: "Bạn phải nhập số điện thoại",
                })}
                defaultValue={staffDetail?.phone}
                errors={errors.phone}
                para=""
              />
            </div>
            <div className="form-row">
              <Input
                type="text"
                className="form-control"
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                id="address"
                validate={register("address", {
                  required: "Bạn phải nhập địa chỉ",
                })}
                defaultValue={staffDetail?.address}
                errors={errors.address}
                para=""
              />
            </div>
            <div className="form-row">
              <label htmlFor="">Trạng thái</label>
              <Switch
                {...label}
                style={{ textAlign: "center" }}
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
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
          </form>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default UpdateStaff;
