import BillPage from "./Bill";
import BillList from "./containers/BillList";
import BillDetail from "./containers/BillDetail";

const billRoutes = [
  {
    path: "/bills",
    element: BillPage,
    children: [
      {
        path: "",
        element: BillList,
      },
      {
        path: ":id",
        element: BillDetail,
      },
    ],
  },
];

export default billRoutes;
