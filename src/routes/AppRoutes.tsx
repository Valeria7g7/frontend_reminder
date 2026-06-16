import { BrowserRouter, Route,Routes,Navigate } from "react-router-dom";
import ProductListPage from "../modules/product/pages/ProductListPage";
import Login from "../modules/login/pages/Login";
import { MainLayout } from "@/Layouts/MainLayout";
import UserListPage from "@/modules/user/pages/UserListPage";
import { Register } from "@/modules/login/pages/Register";  
import UserProductListPage from "@/modules/user-product/pages/UserProductListPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route element={<MainLayout />}>
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/users" element={<UserListPage />} />
      <Route path="/users-product" element={<UserProductListPage />} />
      <Route path="/users/createaccount" element={<ProductListPage />} />
       </Route>
    </Routes>
  </BrowserRouter>

  );
};

export default AppRoutes;