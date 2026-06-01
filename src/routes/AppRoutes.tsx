import { BrowserRouter, Route,Routes } from "react-router-dom";
import ProductListPage from "../modules/product/pages/ProductListPage";
import Login from "../modules/login/pages/Login";
import { MainLayout } from "@/Layouts/MainLayout";
import UserListPage from "@/modules/user/pages/UserListPage";
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
       <Route element={<MainLayout />}>
  
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/users" element={<UserListPage />} />

       <Route path="/list/products" element={<ProductListPage />} />
       </Route>
    </Routes>
  </BrowserRouter>

  );
};

export default AppRoutes;