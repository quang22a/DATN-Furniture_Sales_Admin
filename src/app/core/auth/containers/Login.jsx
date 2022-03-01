import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../stores/action";
import { Input } from "../../../shared/components/partials/Input";
import { validateEmail } from "../../../shared/validate";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const error = useSelector((state) => state?.auth?.errorLogin);
  const msg = useSelector((state) => state?.auth?.msg);

  const onSubmit = (data) => {
    dispatch(login(data, navigate));
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const inputData = [
    {
      id: "email",
      type: "text",
      label: "Email *",
      className: "form-control",
      validate: register("email", { ...validateEmail }),
      errors: errors.email,
      para: "",
    },
    {
      id: "password",
      type: "password",
      label: "Mật khẩu *",
      className: "form-control",
      validate: register("password"),
      errors: errors.password,
      para: "",
    },
  ];
  return (
    <div className="container-auth">
      <div className="section-auth">
        <div className="auth">
          <h3>Đăng nhập</h3>
          <div
            className={
              error ? "error-msg text-center" : "error-msg text-center is-hide"
            }
          >
            {error && msg?.response?.data?.msg}
          </div>
          <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            {inputData.map((item, index) => (
              <Input
                id={item.id}
                type={item.type}
                label={item.label}
                className={item.className}
                validate={item.validate}
                errors={item.errors}
                para={item.para}
                key={index + 1}
              />
            ))}
            <button
              type="submit"
              className="btn btn-auth"
              disabled={!isDirty || !isValid}
            >
              Đăng nhập
            </button>
          </form>
          <Link to="/auth/forgot-password" className="btn btn-outline">
            Quên mật khẩu
          </Link>
        </div>
        <button className="btn btn-back-auth" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default Login;
