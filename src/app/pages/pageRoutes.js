import Page from "./Page";
import homeRoutes from "./home/homeRoutes";
import productRoutes from "./product/productRoutes";
import categoryRoutes from "./category/categoryRoutes";
import brandRoutes from "./brand/brandRoutes";
import profileRoutes from "./profile/profileRoutes";
import billRoutes from "./bill/billRoutes";
import customerRoutes from "./customer/customerRoutes";
import staffRoutes from "./staff/staffRoutes";
import revenueRoutes from "./revenue/revenueRoutes";
import notificationRoutes from "./notification/notificationRoutes";
import contactRoutes from "./contact/contactRoutes";

const pageRoutes = [
  {
    path: "/",
    element: Page,
    isProtected: true,
    children: [
      ...homeRoutes,
      ...productRoutes,
      ...profileRoutes,
      ...categoryRoutes,
      ...brandRoutes,
      ...billRoutes,
      ...customerRoutes,
      ...staffRoutes,
      ...revenueRoutes,
      ...notificationRoutes,
      ...contactRoutes,
    ],
  },
];

export default pageRoutes;
