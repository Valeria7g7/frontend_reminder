export type prop={
    text:String
}
export const LoadingComponent=({text}:prop)=>{
    
    return(
         <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-700">
                        Cargando {text}...
                    </div>
    );
}