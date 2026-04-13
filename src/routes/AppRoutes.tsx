import { BrowserRouter, Route,Routes } from "react-router-dom";
import ProductListPage from "../modules/product/components/ProductListPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductListPage />} />
       <Route path="/products" element={<ProductListPage />} />
    </Routes>
  </BrowserRouter>

  );
};

export default AppRoutes;