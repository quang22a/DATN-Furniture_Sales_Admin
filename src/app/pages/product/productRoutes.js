import ProductPage from "./Product";
import ProductList from "./containers/ProductList";
import ProductDetail from "./containers/ProductDetail";
import AddProduct from "./containers/AddProduct";
import UpdateProduct from "./containers/UpdateProduct";

const productRoutes = [
  {
    path: "/products",
    element: ProductPage,
    children: [
      {
        path: "",
        element: ProductList,
      },
      {
        path: "add-product",
        element: AddProduct,
      },
      {
        path: ":id/update",
        element: UpdateProduct,
      },
      {
        path: ":id",
        element: ProductDetail,
      },
    ],
  },
];

export default productRoutes;
