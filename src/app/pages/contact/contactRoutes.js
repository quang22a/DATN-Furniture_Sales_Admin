import ContactPage from "./Contact";
import ContactList from "./containers/ContactList";
import ContactDetail from "./containers/ContactDetail";

const contactRoutes = [
  {
    path: "/contacts",
    element: ContactPage,
    children: [
      {
        path: "",
        element: ContactList,
      },
      {
        path: ":id",
        element: ContactDetail,
      },
    ],
  },
];

export default contactRoutes;
