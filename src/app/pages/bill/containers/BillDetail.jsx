import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { getProductOfBill, getDetailBill } from "../stores/action";
import { formatPrice } from "../../../shared/helpers/utils/formatPrice";

const BilDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [dataProducts, setDataProducts] = useState();

  const bill = useSelector((state) => state.billReducer.bill);
  const listProduct = useSelector((state) => state.billReducer.listProductBill);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    dispatch(getDetailBill(id));
    dispatch(getProductOfBill(id));
  }, []);

  return (
    <section className="section-bill-detail">
      <div className="container">
        <p className="title text-uppercase">Thông tin đơn hàng</p>
        <div className="bill">
          <p className="title-bill">Thông tin khách hàng</p>
          <div className="bill-info">
            <span className="left">Tên khách hàng</span>
            <span className="right">{bill?.name}</span>
          </div>
          <div className="bill-info">
            <span className="left">Số điện thoại</span>
            <span className="right">{bill?.phone}</span>
          </div>
          <div className="bill-info">
            <span className="left">Địa chỉ email</span>
            <span className="right">{bill?.email}</span>
          </div>
          <div className="bill-info">
            <span className="left">Địa chỉ</span>
            <span className="right">{bill?.address}</span>
          </div>
          <p className="title-bill">Thông tin đơn hàng</p>
          <div className="bill-info">
            <span className="left">Tổng sản phẩm</span>
            <span className="right">{bill?.totalProduct}</span>
          </div>
          <div className="bill-info">
            <span className="left">Tổng tiền</span>
            <span className="right">{bill?.totalPrice}</span>
          </div>
          <div className="bill-info">
            <span className="left">Phương thức thanh toán</span>
            <span className="right">
              {bill?.paymentMethod === "Paypal" ? "Chuyển khoản" : "Tiền mặt"}
            </span>
          </div>
          {bill?.additional && (
            <div className="bill-info">
              <span className="left">Thông tin thêm</span>
              <span className="right">{bill?.additional}</span>
            </div>
          )}

          <div className="bill-info">
            <span className="left">Trạng thái thanh toán</span>
            <span className="right">
              {bill?.paymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
            </span>
          </div>
          <div className="bill-info">
            <span className="left">Trạng thái đơn hàng</span>
            <span className="right">
              {bill?.status ? "Đã giao" : "Chưa giao"}
            </span>
          </div>
          <ul className="list-product">
            {listProduct?.map((item, index) => (
              <li className="item-cart" key={index}>
                <div className="img-product-cart">
                  <img src={item.product[0].image} alt={item.product[0].name} />
                </div>
                <div className="info-product-cart">
                  <p className="name-product">{item.product[0].name}</p>
                  <span className="quantity-product">x{item.quantity}</span>
                  <span className="price">
                    {formatPrice(item.product[0].price || 0)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BilDetail;
