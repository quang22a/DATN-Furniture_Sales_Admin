import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDetailStaff } from "../stores/action";
import Switch from "@mui/material/Switch";

const StaffDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const staffDetail = useSelector((state) => state.staffReducer.dataDetail);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailStaff(id));
      setIsData(true);
    };
    getData();
  }, []);

  return (
    <section className="section-profile">
      <div className="container">
        <p className="title-profile">Thông tin nhân viên</p>
        {staffDetail && isData ? (
          <div className="profile">
            <div className="form-row form-detail">
              <p>Địa chỉ email:</p>
              <p>{staffDetail?.email}</p>
            </div>
            <div className="form-row form-detail">
              <p>Họ tên:</p>
              <p>{staffDetail?.name}</p>
            </div>
            <div className="form-row form-detail">
              <p>Số điện thoại:</p>
              <p>{staffDetail?.phone}</p>
            </div>
            <div className="form-row form-detail">
              <p>Địa chỉ:</p>
              <p>{staffDetail?.address}</p>
            </div>
            <div className="form-row form-detail">
              <p>Trạng thái:</p>
              <Switch
                {...label}
                style={{ textAlign: "center" }}
                checked={staffDetail?.isActive}
              />
            </div>
            <div className="action-edit">
              <Link to="update" className="btn btn-primary">
                Sửa
              </Link>
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

export default StaffDetail;
