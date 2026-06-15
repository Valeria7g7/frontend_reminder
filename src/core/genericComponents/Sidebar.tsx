import {Link} from 'react-router-dom';
//importamos el logo
import logo_2 from "../../assets/logo_2.png";
import { Power } from "lucide-react";
import {useLogin} from '@/modules/login/hooks/useLogin';
const logout=()=>{
 useLogin().logout();
}
export const Sidebar=()=>{
    return(
        <aside className="
    w-full
    md:w-64
    h-auto
    md:h-screen
    bg-pink-900
    text-white
    p-6
    font-bold
    font-mono
    flex
    flex-col
  "
       style={{
        backgroundImage: `url(${logo_2})`,
      }}>
      <nav className="flex flex-col gap-3 mt-12 flex-1 bg-amber-400">
        <h2 className="m-4 text-white font-extrabold text-2xl">Calendario de medicinas</h2>
        <Link to="/products" className="px-3 py-2 rounded mt-7 hover:bg-pink-600 transition text-black text-lg font-bold">
          Productos
        </Link>
        <Link to="/users" className="px-3 py-2 rounded hover:bg-pink-600 transition text-black text-lg font-bold">
          Usuarios
        </Link>
         <Link to="/users-product" className="px-3 py-2 rounded hover:bg-pink-600 transition text-black text-lg font-bold">
          User Products
        </Link>
        <Link to="/"  onClick={logout} className="px-3 py-2  mt-auto rounded hover:bg-red-100 transition text-red-600 font-bold">
         <div className="flex"> Cerrar Sesión
           < Power className="ml-2" /></div>
        </Link>
      </nav>
    </aside>
    );
}