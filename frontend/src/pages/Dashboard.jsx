import { useState ,useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";
import axios from "axios";
import { History } from "../components/History";

export function Dashboard(){
    const [balance, setBalance] = useState(null);
    const [ active ,setActive] = useState("users");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Add auth header if needed
            }
        })
        .then(response => {
            setBalance(response.data.balance); // Set balance from response data
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
        });
    }, []);
    return <div>
        <Appbar setActive={setActive}/>
        <div className="m-8">
            <Balance value={balance}/>
           {active === "users" && <Users/> }
           { active === "hist" &&<History/> }
        </div>
    </div>
}