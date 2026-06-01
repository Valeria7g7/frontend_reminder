import { useEffect, useState } from 'react';
import { ProductCreate } from '../components/ProductCreate';
import { Actions } from '@/interfaces/general.interface';
import { useProductStore } from '../store/product.store';   
import { useProductsList } from '../hooks/useProductsList';
//import { TableActions } from '@/core/genericComponents/TableActions';
import { TableActions } from '@/core/genericComponents/TableActions';
import type { IProduct } from '../interface/Product.interface';
import {ProductResource} from '../resources/Product.resource';
import { MessageConfirmation } from '@/core/genericComponents/MessageConfirmation';
export default function ProductListPage() {
    const { onSearch,} = useProductsList();
    const entities= useProductStore((state)=>state.entities);
    const isLoading= useProductStore((state)=>state.isLoading);
    
    const deleteEntity= useProductStore((state)=>state.deleteEntity);

  
    const [showModalNewProduct, setShowNewProduct] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    //para mandar el mode
    const [mode, setMode] = useState<String>(Actions.CREATE);
    const [entity,setEntity]=useState<IProduct|undefined>(undefined);


    const onEdit=async(product:IProduct)=>{
         setMode(Actions.UPDATE);
         setShowNewProduct(true);
         setEntity(product);
    }
    useEffect(() => {
        fetchProducts();
        
    }, []);

    const fetchProducts = async () => {
        try {
            onSearch();
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
         
        }
    };

const getConfirmation=(entity:IProduct)=>{
    setShowConfirmation(true);
    setEntity(entity);
}
    //delete
    const onDelete=(entity:IProduct)=>{
        if(!entity )return;
        ProductResource.remove(entity.id as any).then(()=>{
            deleteEntity(entity.id as any); 
        })
    }
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Cargando Productos...
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Productos
                    </h1>
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={() => {
                            setMode(Actions.CREATE);
                            setShowNewProduct(true);
                        }}
                    >
                        + nuevo
                    </button>
                </div>

                
                  
               

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">

                        {/* HEADER */}
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left border-b">Name</th>
                                <th className="px-4 py-3 text-left border-b">Description</th>
                                <th className="px-4 py-3 text-left border-b">Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="text-gray-700">
                            {entities.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.description ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-green-600">
                                        ${product.price}
                                    </td>
                                    <td className="px-4 py-3">
                                            <TableActions canDelete={true} canEdit={true} onDelete={() =>getConfirmation(product)}   onEdit={() => onEdit(product)} />
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            {showModalNewProduct && (
                <ProductCreate 
                 isOpen={showModalNewProduct}
                 mode ={mode}
                 setIsOpen={setShowNewProduct} 
                 onClose={() => setShowNewProduct(false)} 
                 entity={entity}
                 />
            )}
       {showConfirmation &&(
        <MessageConfirmation
        message="¿Estás seguro de que deseas eliminar este producto?"
        onConfirm={()=>{
            if(entity)onDelete(entity);
            setShowConfirmation(false);
        }}
        onCancel={()=>setShowConfirmation(false)}
        />
       )}

        </div>
    );
}