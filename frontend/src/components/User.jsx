import { useEffect, useState } from "react"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useDebouce(value , delay=300){
    const [V ,setV] = useState(value)

    useEffect(() =>{
       const id = setTimeout(()=> setV(value),delay)
       return () => clearTimeout(id);
    },[value,delay])

    return V;
}

export const Users = () =>{
    const [users,setUsers] =useState([]);
    const [filter,setFilter]= useState("");
    const debouncedQuery = useDebouce(filter, 350);
      
    useEffect(() =>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + debouncedQuery)
         .then(response =>{
            setUsers(response.data.user)
         })
    },[debouncedQuery])
     
    return <>
        <div className="font-semibold mt-6 text-lg">
            Users 
        </div>
        <div className="my-2">
            <input onChange={(e) =>{
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-[30%] px-2 py-1 border rounded border-slate-200"/>
        </div>
        <div>
            {users.map((user) => <User user={user}/>)}
        </div>
    </>
}

export function User({user}){
    const navigate=useNavigate();
    
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2"> 
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-full"> 
            <Button onCLick={(e) => {
                navigate("/send?id=" +user._id + "&name=" + user.firstname)
            }}  label={"Send Money"}/>
        </div>
    </div>
}