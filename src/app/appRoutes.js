import authRoutes from "./core/auth/authRoutes";
import pageRoutes from "./pages/pageRoutes";

const appRoutes = [...authRoutes, ...pageRoutes];

export default appRoutes;
