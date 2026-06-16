import { UserCreate } from "@/modules/user/components/UserCreate";
import { useState } from "react";
import { Actions } from "@/interfaces/general.interface";
import { useUserStore } from "@/modules/user/store/user.store";
import { FormUser } from "@/modules/user/components/FormUser";
import type { IUser} from "@/modules/user/interface/User.interface";
import { UserResource } from "@/modules/user/resources/User.resource";
import LoginResource from '../resources/LoginResources';
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [accountOwne, setAccountOwner] = useState(true);

    const onSubmit = async (data: IUser) => {
        setLoading(true);
        try {
                const createdUser = await LoginResource.register(data);
                console.log("logeaoo    al nuevo user: ", createdUser);
              //  addEntity(createdUser as IUser);
              //y aqui logeamos al nuevo user y lo mandamos a su cuenta
                //setIsOpen(false);
                navigate("/users");
                
                return;
        } catch (error) {
            console.error("Error saving user: ", error);
        } finally {
            setLoading(false);
        }
    };


  
    const setLoading = useUserStore((state) => state.setLoading);
    const isLoading = useUserStore((state) => state.isLoading);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Crea Tu Cuenta</h1>
                    <p className="text-lg text-gray-600">Únete a nuestra comunidad hoy mismo</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <p className="text-white text-center font-semibold">Completa tu perfil con los datos personales</p>
                    </div>

                    <div className="p-8">
                        <FormUser
                            onSubmit={onSubmit}
                            mode={Actions.CREATE}
                            setIsOpen={setIsOpen}
                            isOpen={isOpen}
                            isLoading={isLoading} 
                            account_owner={true}
                        />
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/" className="text-blue-600 font-semibold hover:text-blue-800 transition">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}