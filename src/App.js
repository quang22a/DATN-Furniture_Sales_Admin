import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import appRoutes from "./app/appRoutes";

import { Header } from "./app/shared/components/layout/Header";
import { Modal } from "./app/shared/components/modules/Modal";
import { RouterOutlet } from "./app/core/modules/custom-router-dom";
import SideBar from "./app/shared/components/sidebar";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <RouterOutlet routes={appRoutes} />
      </Suspense>
      <Modal />
    </Router>
  );
}

export default App;
