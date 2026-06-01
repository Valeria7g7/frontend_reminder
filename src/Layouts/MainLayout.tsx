import {Outlet} from "react-router-dom";
import {Sidebar} from "../core/genericComponents/Sidebar";
export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};