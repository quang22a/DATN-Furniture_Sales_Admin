import CustomerPage from "./Customer";
import CustomerList from "./containers/CustomerList";
import CustomerDetail from "./containers/CustomerDetail";
import UpdateCustomer from "./containers/UpdateCustomer";

const customerRoutes = [
  {
    path: "/customers",
    element: CustomerPage,
    children: [
      {
        path: "",
        element: CustomerList,
      },
      {
        path: ":id/update",
        element: UpdateCustomer,
      },
      {
        path: ":id",
        element: CustomerDetail,
      },
    ],
  },
];

export default customerRoutes;
