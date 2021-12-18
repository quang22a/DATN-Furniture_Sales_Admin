import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "../partials/Input";
import img1 from "../../../../assets/images/img1.png";
import { AuthStorageService } from "../../../core/services/authStorage.service";
import JwtHelper from "../../../core/helpers/jwtHelper";

const storage = new AuthStorageService();
const jwt = new JwtHelper();

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hideAction, setHideAction] = useState(true);

  // const token = localStorage.getItem("token");
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("userInfo"))?.role;
  const id = jwt.getUserId();
  const user = useSelector((state) => state.profileReducer.dataProfile);

  const handleHide = () => {
    setHideAction(!hideAction);
  };
  const handleLogout = async () => {
    storage.removeToken();
    localStorage.removeItem("userInfo");
    navigate("/auth/login");
    window.location.reload();
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <>
      {location.pathname.indexOf("/auth") === -1 ? (
        <header className="header-container">
          <div className="container container-md">
            <div className="header">
              <div className="header-left">
                <a href="/">
                  <p className="logo">Luxury House</p>
                </a>
              </div>
              <div className="header-right">
                <div className="avatar-header">
                  <p className="username">
                    {role === "admin" ? "Admin" : user?.name}
                  </p>
                  <Link to="/profile">
                    <div className="avatar">
                      <span className="avatar-alpha">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </Link>
                  <div className="dropdown-user">
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        handleHide();
                      }}
                    >
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </button>
                    <ul
                      className={`dropdown-user-content ${
                        hideAction && "hide"
                      }`}
                    >
                      {role === "staff" && (
                        <li
                          className="dropdown-user-item"
                          onClick={() => handleHide(true)}
                        >
                          <Link to={`/profile/${id}`}>
                            <button className="btn btn-outline">
                              <i className="fa fa-user" aria-hidden="true"></i>{" "}
                              Cá nhân
                            </button>
                          </Link>
                        </li>
                      )}

                      <li className="dropdown-user-item">
                        <button
                          className="btn btn-outline"
                          onClick={() => {
                            handleLogout();
                          }}
                        >
                          <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        ""
      )}
    </>
  );
};
