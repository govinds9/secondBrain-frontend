import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { user } from "./store/store";


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) =>  {
    const setUser = useSetRecoilState(user)
    
    useEffect(()=>{
 const getuser = async ()=>{

     const token = localStorage.getItem('token')
     const url = import.meta.env.VITE_API_URL;
     if(token){
       try {
        const data = await axios.get(`${url}/me`,{
           headers:{
             Authorization: `Bearer ${token}`
           }
         })
            
           if(data.status===200){
           
             setUser(data.data.data.user)
           }
           else{
             localStorage.removeItem('token')
             setUser(null)
           }
         
       } catch (error) {
        localStorage.removeItem('token')
         setUser(null)
       }
     }
 }
 getuser()
     
    },[setUser])
  return <>{children}</>
}

export default AuthProvider
