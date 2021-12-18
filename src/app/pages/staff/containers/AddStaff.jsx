import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ErrorMsg } from "../../../shared/components/partials/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { addStaff } from "../stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { validateEmail } from "../../../shared/validate";

const AddStaff = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.staffReducer.errorAdd);

  const onSubmit = async (data) => {
    await dispatch(addStaff(data));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && !error) {
      navigate("/staffs");
    }
    setIsSubmit(false);
  }, [isSubmit]);

  return (
    <div className="section-profile">
      <div className="container">
        <form className="profile" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-uppercase title-profile">Thêm nhân viên</p>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Tên"
              placeholder="Nhập tên nhân viên"
              id="name"
              validate={register("name", {
                required: "Bạn phải nhập tên nhân viên",
              })}
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
              validate={register("phone", {
                required: "Bạn phải nhập số điện thoại",
              })}
              errors={errors.phone}
              id="phone"
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Địa chỉ email"
              placeholder="Nhập địa chỉ email"
              id="email"
              validate={register("email", {
                required: "Bạn phải nhập email",
              })}
              errors={errors.email}
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="text"
              className="form-control"
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              validate={register("address", {
                required: "Bạn phải nhập địa chỉ",
              })}
              errors={errors.address}
              id="address"
              para=""
            />
          </div>
          <div className="form-row">
            <Input
              type="password"
              className="form-control"
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              validate={register("password", {
                required: "Bạn phải nhập mật khẩu",
              })}
              errors={errors.password}
              id="password"
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

export default AddStaff;
