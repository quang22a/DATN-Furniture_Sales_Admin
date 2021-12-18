import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { getDetailNotification } from "../stores/action";

const NotificationDetail = () => {
  const [isData, setIsData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationDetail = useSelector(
    (state) => state.notificationReducer.dataDetail
  );

  useEffect(() => {
    const getData = async () => {
      await dispatch(getDetailNotification(id));
      setIsData(true);
    };
    getData();
  }, []);

  return (
    <section className="section-product-detail">
      <div className="container">
        {notificationDetail && isData ? (
          <div className="product-detail row">
            <div className="col-6 product-detail-img">
              <img
                src={notificationDetail?.image}
                alt={notificationDetail?.name}
              />
            </div>
            <div className="col-6">
              <div className="form-row form-detail">
                <p>Tiêu đề:</p>
                <p>{notificationDetail?.title}</p>
              </div>
              <div className="form-row form-detail">
                <p>Nội dung:</p>
                <p>{notificationDetail?.content}</p>
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

export default NotificationDetail;
