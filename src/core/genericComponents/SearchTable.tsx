import  { useState,useEffect } from 'react';
import type { ISearchParams} from '../interfaces/interfaces.interface'
type Props = {
  paramsSearch: ISearchParams
  onSearch: (params?: ISearchParams) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
};


export const SearchTable=({
  paramsSearch,
  onSearch,
  onClear,
  placeholder = 'Buscar...',
  disabled = false,
}:Props)=>{

  const [valueInput, setValueInput] = useState('');

useEffect(() => {
  console.log("🔵 MOUNT SearchTable");
  return () => console.log("🔴 UNMOUNT SearchTable");
}, []);
  const handleSearch = () => {
    if(valueInput){
        console.log("valueinput1: ",valueInput)
        const searhValues:ISearchParams={
            ...paramsSearch,
            search:{value:valueInput,case_sensitive: false}

        }
        console.log("buscaremos")
                console.log("valueinput2: ",valueInput)

         onSearch(searhValues);
                 console.log("valueinput3: ",valueInput)

         console.log("buscando")
    }
    if(!valueInput)onSearch();//value.trim()
  };

  const handleClear = () => {
    setValueInput('');
    if (onClear) onClear();
    onSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="text"
        value={valueInput}/* e.target.value */
        onChange={(e) => setValueInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
      />
      <button
        type="button"
        onClick={handleSearch}
        disabled={disabled}
        className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Buscar
      </button>
      <button
        type="button"
        onClick={handleClear}
        disabled={disabled || valueInput === ''}
        className="rounded-md bg-orange-200 px-3 py-2 text-sm font-medium text-gray-800 transition hover:bg-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
      >
        Limpiar
      </button>
    </div>
  );
};

export default SearchTable;
