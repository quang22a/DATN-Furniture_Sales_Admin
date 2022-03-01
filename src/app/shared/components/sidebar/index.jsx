import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

const SideBar = () => {
  const location = useLocation();
  const [quantityNewBill, setQuantityNewBill] = useState(0);
  // const socket = io.connect("http://localhost:8000");
  const socket = io.connect("https://datn-be.herokuapp.com");
  const role = JSON.parse(localStorage.getItem("userInfo"))?.role;
  useEffect(() => {
    socket.on("connect", (data) => {
      socket.emit("client-create-bill", "");
    });
    socket.on("server-notification-new-bill", (data) => {
      console.log(data);
      setQuantityNewBill(parseInt(data));
    });
  }, []);

  return (
    <div className="section-sidebar">
      <div className="sidebar">
        <div
          className={`sidebar-option ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <i className="fas fa-bars"></i>
          <Link to="/" className="btn btn-outline">
            Dashboard
          </Link>
        </div>
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/products") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-couch"></i>
          <Link to="/products" className="btn btn-outline">
            Sản phẩm
          </Link>
        </div>
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/categories") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-square"></i>
          <Link to="/categories" className="btn btn-outline">
            Danh mục
          </Link>
        </div>
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/brands") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-square"></i>
          <Link to="/brands" className="btn btn-outline">
            Thương hiệu
          </Link>
        </div>
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/notifications") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-square"></i>
          <Link to="/notifications" className="btn btn-outline">
            Thông báo
          </Link>
        </div>
        {role && role === 'admin' && (
          <div
            className={`sidebar-option ${
              location.pathname.indexOf("/staffs") !== -1 ? "active" : ""
            }`}
          >
            <i className="fas fa-user"></i>
            <Link to="/staffs" className="btn btn-outline">
              Nhân viên
            </Link>
          </div>
        )}
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/customers") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-user"></i>
          <Link to="/customers" className="btn btn-outline">
            Khách hàng
          </Link>
        </div>
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/bills") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-shopping-cart"></i>
          <Link to="/bills" className="btn btn-outline">
            Đơn hàng
          </Link>
          {quantityNewBill > 0 ? <span>{quantityNewBill}</span> : ""}
        </div>
        <div
          className={`sidebar-option ${
            location.pathname.indexOf("/contacts") !== -1 ? "active" : ""
          }`}
        >
          <i className="fas fa-shopping-cart"></i>
          <Link to="/contacts" className="btn btn-outline">
            Liên hệ
          </Link>
        </div>
        {role && role === 'admin' && (
          <div
            className={`sidebar-option ${
              location.pathname.indexOf("/revenue") !== -1 ? "active" : ""
            }`}
          >
            <i className="fas fa-chart-line"></i>
            <Link to="/revenue" className="btn btn-outline">
              Thống kê
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
