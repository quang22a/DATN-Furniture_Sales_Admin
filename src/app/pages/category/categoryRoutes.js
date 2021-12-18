import CategoryPage from "./Category";
import CategoryList from "./containers/CategoryList";
import AddCategory from "./containers/AddCategory";
import CategoryDetail from "./containers/CategoryDetail";
import UpdateCategory from "./containers/UpdateCategory";

const productRoutes = [
  {
    path: "/categories",
    element: CategoryPage,
    children: [
      {
        path: "",
        element: CategoryList,
      },
      {
        path: "add-category",
        element: AddCategory,
      },
      {
        path: ":id/update",
        element: UpdateCategory,
      },
      {
        path: ":id",
        element: CategoryDetail,
      },
    ],
  },
];

export default productRoutes;
