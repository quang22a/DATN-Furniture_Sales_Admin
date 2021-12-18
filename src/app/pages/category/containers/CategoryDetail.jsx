import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDetailCategory } from "../stores/action";
import Switch from "@mui/material/Switch";

const CategoryDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryDetail = useSelector(
    (state) => state.categoryReducer.dataDetail
  );
  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailCategory(id));
      setIsData(true);
    };
    getData();
  }, []);

  return (
    <section className="section-product-detail">
      <div className="container">
        <p className="title">Chi tiết danh mục</p>
        {categoryDetail && isData ? (
          <div className="product-detail row">
            <div className="col-6 product-detail-img">
              <img src={categoryDetail?.image} alt={categoryDetail?.name} />
            </div>
            <div className="col-6">
              <div className="form-row form-detail">
                <p>Tên:</p>
                <p>{categoryDetail?.name}</p>
              </div>
              <div className="form-row form-detail">
                <p>Nổi bật:</p>
                <Switch
                  {...label}
                  style={{ textAlign: "center" }}
                  checked={categoryDetail?.isTrending}
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

export default CategoryDetail;
