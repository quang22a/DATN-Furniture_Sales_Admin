import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDetailCustomer } from "../stores/action";
import Switch from "@mui/material/Switch";

const CustomerDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const customerDetail = useSelector(
    (state) => state.customerReducer.dataDetail
  );
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailCustomer(id));
      setIsData(true);
    };
    getData();
  }, []);

  return (
    <section className="section-profile">
      <div className="container">
        <p className="title-profile">Thông tin khách hàng</p>
        {customerDetail && isData ? (
          <div className="profile">
            <div className="form-row form-detail">
              <p>Địa chỉ email:</p>
              <p>{customerDetail?.email}</p>
            </div>
            <div className="form-row form-detail">
              <p>Họ tên:</p>
              <p>{customerDetail?.name}</p>
            </div>
            <div className="form-row form-detail">
              <p>Số điện thoại:</p>
              <p>{customerDetail?.phone}</p>
            </div>
            <div className="form-row form-detail">
              <p>Địa chỉ:</p>
              <p>{customerDetail?.address}</p>
            </div>
            <div className="form-row form-detail">
              <p>Trạng thái:</p>
              <Switch
                {...label}
                style={{ textAlign: "center" }}
                checked={customerDetail?.isActive}
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

export default CustomerDetail;
