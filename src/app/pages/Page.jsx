import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useDispatch } from "react-redux";

import { getProfile } from "./profile/stores/action";
import Sidebar from "../shared/components/sidebar";

const Page = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("userInfo") || {}).role;

  useEffect(() => {
    if (token && role === "staff") {
      dispatch(getProfile());
    }
  }, []);
  return (
    <>
      <Sidebar />
      <div className="page-section">
        <main className="main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Page;
