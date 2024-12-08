import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Root } from "./component/Root"
import { SingIn } from "./component/SignIn"
import { SingUp } from "./component/SignUp"
import { Dashboard } from "./component/Dashboard"
// import { Send } from "./component/Send"
import { SendMoney } from "./component/SendMoney"

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/signIn" element={<SingIn/>}/>
          <Route path="/signUp" element={<SingUp/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
        </Routes>
      
      </BrowserRouter>
    </div>
  )
}

export default App
