import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  countCustomer,
  countProduct,
  countProductSale,
  countStaff,
  getProductHot,
} from "./stores/action";

const Home = () => {
  const dispatch = useDispatch();

  const quantityCustomer = useSelector(
    (state) => state.homeReducer.countCustomer
  );
  const quantityStaff = useSelector((state) => state.homeReducer.countStaff);
  const quantityProduct = useSelector(
    (state) => state.homeReducer.countProduct
  );
  const quantityProductSale = useSelector(
    (state) => state.homeReducer.countProductSale
  );
  const productHot = useSelector((state) => state.homeReducer.productHot);

  useEffect(() => {
    dispatch(countCustomer());
    dispatch(countStaff());
    dispatch(countProduct());
    dispatch(countProductSale());
    dispatch(getProductHot());
  }, []);

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard-count row">
          <div className="product-hot col-8">
            <p className="title">Sản phẩm bán chạy nhất tháng</p>
            <div className="product">
              <div className="product-img">
                <img
                  src={productHot?.image}
                  alt="Sản phẩm bán chạy nhất tháng"
                />
              </div>
              <div className="product-info">
                <p className="product-name">{productHot?.name}</p>
                <p className="category">
                  Danh mục: <span>{productHot?.category[0]?.name}</span>
                </p>
                <p className="quantity-sale">
                  Số lượng bán được: <span>{productHot?.quantitySale}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="dashboard-item">
              <div className="staff">
                <p>Số lượng nhân viên</p>
                <p>{quantityStaff}</p>
              </div>
            </div>
            <div className="dashboard-item">
              <div className="customer">
                <p>Số lượng khách hàng</p>
                <p>{quantityCustomer}</p>
              </div>
            </div>
            <div className="dashboard-item">
              <div className="product">
                <p>Số lượng sản phẩm</p>
                <p>{quantityProduct}</p>
              </div>
            </div>
            <div className="dashboard-item">
              <div className="product-sale">
                <p>Số lượng sản phẩm bán được</p>
                <p>{quantityProductSale}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
