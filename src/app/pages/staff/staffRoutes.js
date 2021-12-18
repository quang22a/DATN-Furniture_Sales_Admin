import StaffPage from "./Staff";
import StaffList from "./containers/StaffList";
import AddStaff from "./containers/AddStaff";
import StaffDetail from "./containers/StaffDetail";
import UpdateStaff from "./containers/UpdateStaff";

const staffRoutes = [
  {
    path: "/staffs",
    element: StaffPage,
    children: [
      {
        path: "",
        element: StaffList,
      },
      {
        path: "add-staff",
        element: AddStaff,
      },
      {
        path: ":id/update",
        element: UpdateStaff,
      },
      {
        path: ":id",
        element: StaffDetail,
      },
    ],
  },
];

export default staffRoutes;
