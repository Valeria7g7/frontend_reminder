export type MessageConfirmationProps={
    message: string
    onConfirm:()=>void;
    onCancel:()=>void;
}
export const MessageConfirmation=({message,onConfirm,onCancel}:MessageConfirmationProps)=>{
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-800 text-lg">{message}</p>
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={onConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>

    );

}
