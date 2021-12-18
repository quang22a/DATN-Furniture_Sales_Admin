import ProfilePage from "./Profile";
import ProfileUser from "./containers/ProfileUser";
import UpdatePassword from "./containers/UpdatePassword";
import UpdateProfile from "./containers/UpdateProfile";

const profileRoutes = [
  {
    path: "/profile",
    element: ProfilePage,
    children: [
      {
        path: "",
        element: ProfileUser,
      },
      {
        path: "update-profile",
        element: UpdateProfile,
      },
      {
        path: "update-password",
        element: UpdatePassword,
      },
    ],
  },
];

export default profileRoutes;
