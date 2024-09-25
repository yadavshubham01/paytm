export function Button ({label,onCLick}){
    return (
        <div>
         <button onClick={onCLick} type="buttton" className="w-full text-white bg-blue-700 hover:bg-blue-500 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
        </div>
    )
}