import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { getProfile } from "../stores/action";

const ProfileUser = () => {
  const navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("userInfo") || {}).role;
  const dispatch = useDispatch();
  const profileUser = useSelector((state) => state.profileReducer.dataProfile);
  useEffect(() => {
    if (role === "staff") {
      dispatch(getProfile());
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="section-profile">
      <div className="container">
        <div className="profile">
          <p className="text-uppercase title-profile">Thông tin cá nhân</p>
          <div className="form-row">
            <span className="title-info">Họ tên: </span>
            <span className="info">{profileUser?.name}</span>
          </div>
          <div className="form-row">
            <span className="title-info">Địa chỉ email: </span>
            <span className="info">{profileUser?.email}</span>
          </div>
          <div className="form-row">
            <span className="title-info">Số điện thoại: </span>
            <span className="info">{profileUser?.phone}</span>
          </div>
          <div className="form-row">
            <span className="title-info">Địa chỉ: </span>
            <span className="info">{profileUser?.address}</span>
          </div>
          <div className="action-profile">
            <Link to="/profile/update-profile" className="btn btn-black">
              Cập nhật
            </Link>
            <Link to="/profile/update-password" className="btn btn-black">
              Đổi mật khẩu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
