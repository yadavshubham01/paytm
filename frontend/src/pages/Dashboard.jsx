import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";


export function Dashboard(){
    return <diV>
        <Appbar/>
        <div className="m-8">
            <Balance value={"10,000"}/>
            <Users/>
        </div>
    </diV>
}