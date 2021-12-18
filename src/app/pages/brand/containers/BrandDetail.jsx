import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDetailBrand } from "../stores/action";
import Switch from "@mui/material/Switch";

const BrandDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const brandDetail = useSelector((state) => state.brandReducer.dataDetail);
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailBrand(id));
      setIsData(true);
    };
    getData();
  }, []);

  return (
    <section className="section-product-detail">
      <div className="container">
        <p className="title">Chi tiết thương hiệu</p>
        {brandDetail && isData ? (
          <div className="product-detail row">
            <div className="col-6 product-detail-img">
              <img src={brandDetail?.image} alt={brandDetail?.name} />
            </div>
            <div className="col-6">
              <div className="form-row form-detail">
                <p>Tên:</p>
                <p>{brandDetail?.name}</p>
              </div>
              <div className="form-row form-detail">
                <p>Xu hướng:</p>
                <Switch
                  {...label}
                  style={{ textAlign: "center" }}
                  checked={brandDetail?.isFeatured}
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
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default BrandDetail;
