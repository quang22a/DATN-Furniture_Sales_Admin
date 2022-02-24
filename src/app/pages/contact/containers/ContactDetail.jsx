import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { getDetailContact, updateContact } from "../stores/action";
import Switch from "@mui/material/Switch";

const ContactDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contactDetail = useSelector((state) => state.contactReducer.dataDetail);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailContact(id));
      setIsData(true);
    };
    getData();
  }, []);

  const changeStatus = async () => {
    await dispatch(
      updateContact(contactDetail?._id, { status: !contactDetail?.status })
    );
    await dispatch(getDetailContact(id));
  };

  return (
    <section className="section-profile">
      <div className="container">
        <p className="title-profile">Chi tiết liên hệ</p>
        {contactDetail && isData ? (
          <div className="profile">
            <div className="form-row form-detail">
              <p>Tên:</p>
              <p>{contactDetail?.name}</p>
            </div>
            <div className="form-row form-detail">
              <p>Số điện thoại:</p>
              <p>{contactDetail?.phone}</p>
            </div>
            <div className="form-row form-detail">
              <p>Địa chỉ email:</p>
              <p>{contactDetail?.email}</p>
            </div>
            <div className="form-row form-detail">
              <p>Nội dung:</p>
              <p>{contactDetail?.msg}</p>
            </div>
            <div className="form-row form-detail">
              <p>Trạng thái:</p>
              <Switch
                {...label}
                style={{ textAlign: "center" }}
                checked={contactDetail?.status}
                onChange={() => changeStatus()}
              />
            </div>
            <div className="action-edit">
              <button className="btn btn-black" onClick={() => navigate(-1)}>
                Quay lại
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default ContactDetail;
