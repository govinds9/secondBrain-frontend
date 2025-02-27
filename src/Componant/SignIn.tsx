import { useEffect, useRef, useState } from "react"
import AsyncBrainLogo from "./ui/Logo"
import {  useNavigate } from "react-router";
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { user } from "../store/store";




const SignIn = () => {
    
     const emailRef = useRef<HTMLInputElement>(null)
     const passwordRef = useRef<HTMLInputElement>(null);
     const navigate = useNavigate()
     const [loading,setLoading] = useState(false)
      const userInfo = useRecoilValue(user)
      const setUser = useSetRecoilState(user)
        
      useEffect(()=>{
        if(userInfo)navigate('/')
      },[userInfo])


     const handleSignin = async ()=>{
      const email = emailRef.current?.value
      const password = passwordRef.current?.value

  try {
    
    if(email === '' || password===''){
      toast.error("all Fieald Required")
      return
    }
    
  setLoading(true)
  
  const url = import.meta.env.VITE_API_URL;
  
  
  
  const data = await axios.post(`${url}/signin`,{
    
    email,
    password
  })
 
  if(data.status>200){
   
    toast.error(data.data.message)
    setLoading(false)
    return
  }
  const toastoption = {
    onClose:()=>navigate('/'),
    autoClose:2000
  }
  
  localStorage.setItem("token",data.data.token)
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
        setUser(null)
      }
    }
  }
  getuser()
  setLoading(false)
  toast.success(data.data.message,toastoption)
  
  
} catch (error) {
  if(axios.isAxiosError(error)){
    toast.error(error?.response?.data?.message)
    setLoading(false)
  }
  else{
    setLoading(false)
    throw(error)
  }
}
      
     }

  return (
    <div className="  w-screen  h-screen flex  flex-col sm:flex-row  bg-bglight ">
        <div className=" p-4 sm:w-2/5 w-full h-2/5 sm:h-full"> 

        <AsyncBrainLogo/>
        <div className="  flex  items-center justify-center mt-[25%] p-[10%]">
           <div className=" sm:text-5xl  text-2xl font-bold text-black tracking-widest">Save Smarter, Not Harder – <span className=" text-primarybtn">Welcome to Async Brain!</span></div>

        </div>


        </div>
        <ToastContainer/>
        <div className=" relative bg-white sm:w-3/5 w-full sm:mt-4 sm:rounded-l-2xl  rounded-2xl  h-3/5   sm:h-full flex flex-col  items-center  justify-center ">


        <div className=" absolute bg-white sm:w-3/5 w-full sm:mt-4 sm:rounded-l-2xl  rounded-2xl  h-3/5   sm:h-full flex flex-col  items-center  justify-center sm:p-[15%] p-[10%] gap-[5%] ">
                     <div className=" md:text-3xl text-2xl  text-black font-bold w-full  text-center">
                      <span> Hi, WelCome back! </span><span >
                      &#128075;

                       </span>
                     </div>
                     <div className=" w-full flex flex-col  gap-4 tracking-wider ">
                      
                       <div className=" flex flex-col gap-2 ">
                       <div className=" px-3 text-black">Email Address</div>
                       <input type="text" placeholder="Enter Your Email" ref={emailRef} className=" p-3 rounded-xl  border-2  border-solid  border-slate-400 text-black  font-medium  w-full" />
                       </div>
                       <div className=" flex flex-col gap-2 ">
                       <div className=" px-3 text-black">Password</div>
                       <input type="text" placeholder="Enter Your password" ref={passwordRef} className=" p-3 rounded-xl  border-2  border-solid  border-slate-400 text-black   font-medium  w-full" />
                       </div>
                     </div>
                     <button  onClick={handleSignin} className=" tracking-wider w-full text-center hover:bg-blue-800 cursor-pointer bg-primarybtn text-white font-normal rounded-xl p-2">SignIn</button>
                     <div>Don't have an account ? <span onClick={()=>navigate('/signup')} className=" text-blue-500  cursor-pointer  hover:text-primarybtn">SignUp</span></div>
        </div>
        { loading?<div className="   absolute  bg-opacity-45 top-0 bg-white sm:w-3/5 w-full sm:mt-4 sm:rounded-l-2xl  rounded-2xl  h-3/5   sm:h-full flex flex-col  items-center  justify-center sm:p-[15%] p-[10%] gap-[5%] ">
       <div className="animate-spin  inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
        </div>:null}

        </div>
       
    </div>
  )
}

export default SignIn
