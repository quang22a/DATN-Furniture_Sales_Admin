import Login from "./containers/Login";
import ForgotPassword from "./containers/ForgotPassword";
import Auth from "./index";

const authRoutes = [
  {
    path: "/auth",
    element: Auth,
    children: [
      {
        path: "",
        redirect: "login",
      },
      {
        path: "login",
        element: Login,
      },
      {
        path: "forgot-password",
        element: ForgotPassword,
      },
    ],
  },
];

export default authRoutes;
