import { useEffect, useState } from 'react';
import { PrescriptionCreate } from '../components/PrescriptionCreate';
import { Actions } from '@/interfaces/general.interface';
import { usePrescriptionStore } from '../store/prescription.store';
import { usePrescriptionsList } from '../hooks/usePrescriptionList';
//import { TableActions } from '@/core/genericComponents/TableActions';
import { TableActions } from '@/core/genericComponents/TableActions';
import type { IPrescription } from '../interface/Prescription.interface';
import { PrescriptionResource } from '../resources/Prescription.resource';
import { MessageConfirmation } from '@/core/genericComponents/MessageConfirmation';
import { NoData } from '@/core/genericComponents/NoData';
export default function PrescriptionListPage() {
    const { onSearch, } = usePrescriptionsList();
    const entities = usePrescriptionStore((state) => state.entities);
    const isLoading = usePrescriptionStore((state) => state.isLoading);


    const deleteEntity = usePrescriptionStore((state) => state.deleteEntity);


    const [showModalNew, setShowNew] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    //para mandar el mode
    const [mode, setMode] = useState<string>(Actions.CREATE);
    const [entity, setEntity] = useState<IPrescription | undefined>(undefined);


    const onEdit = async (product: IPrescription) => {
        setMode(Actions.UPDATE);
        setShowNew(true);
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

    const getConfirmation = (entity: IPrescription) => {
        setShowConfirmation(true);
        setEntity(entity);
    }
    //delete
    const onDelete = (entity: IPrescription) => {
        if (!entity) return;
        PrescriptionResource.remove(entity.id as any).then(() => {
            deleteEntity(entity.id as any);
        })
    }
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Cargando Usuarios...
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-full">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Usuarios
                    </h1>
                    <button
                        type="button"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        onClick={() => {
                            setMode(Actions.CREATE);
                            setShowNew(true);
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
                                <th className="px-4 py-3 text-left border-b">Fecha</th>
                                <th className="px-4 py-3 text-left border-b">Total</th>
                                <th className="px-4 py-3 text-left border-b">Descripción</th>
                                
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="text-gray-700">
                            {entities.map((entity) => (
                                <tr
                                    key={entity.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">
                                        {entity.date}
                                    </td>
                                    <td className="px-4 py-3">
                                        {entity.total??'--'}
                                    </td>
                                    <td className="px-4 py-3">
                                        {entity.description}
                                    </td>
                                    <td className="px-4 py-3">
                                        <TableActions canDelete={true} canEdit={true} onDelete={() => getConfirmation(entity)} onEdit={() => onEdit(entity)} />

                                    </td>
                                </tr>
                            ))}

                        </tbody>


                    </table>
                </div>
                {entities.length === 0 && (
                    <div className="border border-border rounded-lg p-6">
                        <NoData />
                    </div>

                )}
            </div>
            {showModalNew && (
                <PrescriptionCreate
                    isOpen={showModalNew}
                    mode={mode}
                    setIsOpen={setShowNew}
                    onClose={() => setShowNew(false)}
                    entity={entity}
                />
            )}
            {showConfirmation && (
                <MessageConfirmation
                    message="¿Estás seguro de que deseas eliminar este usuario?"
                    onConfirm={() => {
                        if (entity) onDelete(entity);
                        setShowConfirmation(false);
                    }}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}

        </div>
    );
}