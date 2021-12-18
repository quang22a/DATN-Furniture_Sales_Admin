import { useState } from "react";

import { Input } from "../partials/Input";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../validate";
import img from "../../../../assets/images/sectioncontact.jpg";

export const Contact = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const [msgContact, setMsgContact] = useState("");
  const watchName = watch("name");
  const watchPhoneNumber = watch("phone");
  const watchEmail = watch("email");

  const onSubmitContact = () => {
    console.log(watchName, watchPhoneNumber, watchEmail, msgContact);
  };

  return (
    <div className="section-contact">
      <div className="container">
        <div className="contact">
          <div className="info">
            <div className="title">
              <h3>Bạn cần hỗ trợ?</h3>
              <p>Xin vui lòng để lại yêu cầu hỗ trợ của bạn.</p>
            </div>
            <form className="form-contact">
              <Input
                id="name"
                name="name"
                type="text"
                validate={register("name", {
                  required: "Name is required",
                })}
                errors={errors.name}
                className="form-control name"
                placeholder="Họ tên"
              />
              <Input
                id="phone"
                name="phone"
                type="text"
                validate={register("phone", {
                  required: "Phone Number is required",
                })}
                errors={errors.phone}
                className="form-control phone"
                placeholder="0123456789"
              />
              <Input
                id="email"
                name="email"
                type="text"
                validate={register("email", { ...validateEmail })}
                errors={errors.email}
                className="form-control email"
                placeholder="Email"
                para=""
              />
              <textarea
                name="msg"
                id="msg"
                rows="4"
                className="form-control msg"
                placeholder="Nội dung liên hệ"
                onChange={(e) => {
                  setMsgContact(e.target.value);
                }}
              ></textarea>
              <button
                type="button"
                className="btn btn-contact"
                disabled={!isDirty || !isValid}
                onClick={() => {
                  onSubmitContact();
                }}
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>
          <div className="img">
            <img src={img} alt="image liên hệ" />
          </div>
        </div>
      </div>
    </div>
  );
};
