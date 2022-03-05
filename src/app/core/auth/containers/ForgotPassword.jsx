import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import { Input } from "../../../shared/components/partials/Input";
import { validateEmail } from "../../../shared/validate";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container-auth">
      <div className="section-auth">
        <div className="auth">
          <h3>Quên mật khẩu</h3>
          <div className="error-msg text-center"></div>
          <form className="form-auth" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="text"
              label="Địa chỉ email *"
              className="form-control"
              validate={register("email", { ...validateEmail })}
              errors={errors.email}
              para=""
            />
            <button type="submit" className="btn btn-auth">
              Gửi
            </button>
          </form>
          <Link to="/auth/login" className="btn btn-outline">
            Đăng nhập
          </Link>
        </div>
        <button className="btn btn-back-auth" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
