import {Router,BrowserRouter, Route, Routes} from "react-router-dom"
import { Signin } from "./pages/signin"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/SendMoney"
import { Signup } from "./pages/signup"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/send" element={<SendMoney/>}></Route>
      </Routes>
     </BrowserRouter> 
    </>
  )
}

export default App
