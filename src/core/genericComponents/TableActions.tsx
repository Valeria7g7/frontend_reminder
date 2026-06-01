type TableActionsProps={
    onEdit:()=>void;
    onDelete:()=>void;
    canEdit?:boolean;
    canDelete?:boolean;
    
}
export const TableActions=({onDelete, onEdit, canEdit, canDelete}:TableActionsProps)=>{
    return(
        <div className="flex space-x-2">
            <div><button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"  onClick={onEdit} disabled={!canEdit}>Editar</button></div>
            <div><button className="ml-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition" onClick={onDelete} disabled={!canDelete}>Eliminar</button></div>
        </div>
    );
}