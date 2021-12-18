import BrandPage from "./Brand";
import BrandList from "./containers/BrandList";
import AddBrand from "./containers/AddBrand";
import BrandDetail from "./containers/BrandDetail";
import UpdateBrand from "./containers/UpdateBrand";

const productRoutes = [
  {
    path: "/brands",
    element: BrandPage,
    children: [
      {
        path: "",
        element: BrandList,
      },
      {
        path: "add-brand",
        element: AddBrand,
      },
      {
        path: ":id/update",
        element: UpdateBrand,
      },
      {
        path: ":id",
        element: BrandDetail,
      },
    ],
  },
];

export default productRoutes;
