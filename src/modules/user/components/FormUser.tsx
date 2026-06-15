import {Actions} from "@/interfaces/general.interface";
import { useForm } from "react-hook-form";
import { userSchema } from "../interface/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
export type FormUserProps={
   
    onSubmit:any;
 
    mode:any;
    setIsOpen:any;
    isOpen:any;
    isLoading:any;
    account_owner?:boolean;
}
export const FormUser=({ onSubmit ,mode,setIsOpen,isLoading,account_owner}:FormUserProps)=>{
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
          resolver: zodResolver(userSchema),
          defaultValues: {
              account_owner: account_owner ?? false,
          },
      });  
    
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nombre y Apellidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
                            Nombre <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="name"    
                            {...register("name")} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="Tu nombre"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block text-sm font-semibold text-gray-800 mb-2">
                            Primer Apellido <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="last_name"    
                            {...register("last_name")} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="Tu primer apellido"
                        />
                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
                    </div>
                </div>

                {/* Segundo Apellido */}
                <div>
                    <label htmlFor="second_last_name" className="block text-sm font-semibold text-gray-800 mb-2">
                        Segundo Apellido
                    </label>
                    <input 
                        type="text" 
                        id="second_last_name" 
                        {...register("second_last_name")} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                        placeholder="Tu segundo apellido (opcional)"
                    />
                    {errors.second_last_name && <p className="text-red-500 text-sm mt-1">{errors.second_last_name.message}</p>}
                </div>

                {/* Teléfono y Fecha Nacimiento */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                            Teléfono
                        </label>
                        <input 
                            type="text" 
                            id="phone"    
                            {...register("phone")} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="+34 612 345 678"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="birth_date" className="block text-sm font-semibold text-gray-800 mb-2">
                            Fecha de Nacimiento
                        </label>
                        <input 
                            type="date" 
                            id="birth_date"    
                            {...register("birth_date")} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                        />
                        {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date.message}</p>}
                    </div>
                </div>

                {/* Género Biológico */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-semibold text-gray-800 mb-2">
                        Género Biológico
                    </label>
                    <select 
                        id="gender" 
                        {...register("gender")} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                        <option value="">Selecciona un género</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                </div>

                {/* Alergias */}
                <div>
                    <label htmlFor="allergies" className="block text-sm font-semibold text-gray-800 mb-2">
                        Alergias
                    </label>
                    <textarea 
                        id="allergies" 
                        {...register("allergies")} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none" 
                        rows={3}
                        placeholder="Indica cualquier alergia conocida (opcional)"
                    />
                    {errors.allergies && <p className="text-red-500 text-sm mt-1">{errors.allergies.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="email"    
                        {...register("email")} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                        placeholder="Tu email"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="password"    
                            {...register("password")} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                            placeholder="Tu contraseña"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                {/* Buttons */}
                <div className="flex gap-4 pt-6">
                    <button 
                        type="button" 
                        onClick={() => setIsOpen(false)} 
                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando..." : (mode === Actions.CREATE ? "Crear Cuenta" : "Actualizar")}
                    </button>
                </div>
            </form>
        </div>
    );
}