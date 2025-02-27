
import { Route, Routes } from "react-router";
import Layout from "./Componant/Layout";
import SignIn from "./Componant/SignIn";
import Signup from "./Componant/Signup";
import Protectedroute from "./Componant/protected";
import ShareBrain from "./Componant/ShareBrain";






function App() {
  

  return (
   <>
   <Routes>

    <Route path="/" element={
      <Protectedroute>
        <Layout/>
      </Protectedroute>
    } />
   <Route path="/signin" element={<SignIn/>}/>
   <Route path="/signup" element={<Signup/>}/>
   <Route path="/brainshare/:id" Component={ShareBrain} />

   </Routes>
   </>
  
   
  )
}

export default App
