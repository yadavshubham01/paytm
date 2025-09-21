

export function Appbar({ setActive}) {
   
    return (
        <div className="shadow h-14 flex justify-between bg-gray-800">
            <div className="flex flex-col justify-center text-white h-full mr-4">
                PayTM App
            </div>
            <div className="flex">
                <button className="flex flex-col text-white justify-center h-full mr-4" onClick={()=> setActive("users")}>Search</button>
                <button className="flex flex-col text-white justify-center h-full mr-4" onClick={()=> setActive("hist") }>History</button> 
                <div className="flex flex-col text-white justify-center h-full mr-4">
                    Hello 
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                       U {/* {user.firstname[0] || U} */}
                    </div>
                </div>
            </div>
        </div>
    )
}