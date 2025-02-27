import { useRef, useState } from "react"
import AsyncBrainLogo from "./ui/Logo"
import { useNavigate } from "react-router"
import { ToastContainer,toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Signup = () => {
     const nameRef = useRef<HTMLInputElement>(null)
     const emailRef = useRef<HTMLInputElement>(null)
     const passwordRef = useRef<HTMLInputElement>(null);
     const [loading, setLoading] = useState<boolean>(false)
     const navigate = useNavigate()

     const handlesignup = async ()=>{
      const name = nameRef.current?.value
      const email = emailRef.current?.value
      const password = passwordRef.current?.value

      if(name==='' || email ==='' || password ===''){toast.error("All fields are Required")
        return
      }
      setLoading(true)
      const url = import.meta.env.VITE_API_URL;


        
        const data = await axios.post(`${url}/signup`,{
          name,
          email,
          password
        })

        if(data.status>200){
          toast.error(data.data.message)
          return
        }
        const toastoption = {
          onClose:()=>navigate('/signin'),
          autoClose:2000
        }
        setLoading(false)
        toast.success(data.data.message,toastoption)
        

     }

  return (
    <div className="  w-screen  h-screen flex  flex-col sm:flex-row  bg-bglight ">
        <div className=" p-4 sm:w-2/5 w-full h-2/5 sm:h-full"> 

        <AsyncBrainLogo/>
        <div className="  flex  items-center justify-center mt-[25%] p-[10%]">
           <div className=" sm:text-5xl  text-2xl font-bold text-black tracking-widest">Save Smarter, Not Harder – <span className=" text-primarybtn">Welcome to Async Brain!</span></div>

        </div>
        
          <ToastContainer/>

        </div>

       <div className=" relative bg-white sm:w-3/5 w-full sm:mt-4 sm:rounded-l-2xl  rounded-2xl  h-3/5   sm:h-full flex flex-col  items-center  justify-center ">
       { loading?<div className="  z-10 absolute  bg-opacity-45 top-0 bg-white sm:w-3/5 w-full sm:mt-4 sm:rounded-l-2xl  rounded-2xl  h-3/5   sm:h-full flex flex-col  items-center  justify-center sm:p-[15%] p-[10%] gap-[5%] ">
       <div className="animate-spin  inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
        </div>:null}
        <div className=" absolute  bg-white sm:w-3/5 w-full sm:mt-4 sm:rounded-l-2xl  rounded-2xl  h-3/5   sm:h-full flex flex-col  items-center  justify-center sm:p-[15%] p-[10%] gap-[5%] ">
                     <div className="  text-3xl  text-black font-bold w-full ">
                       Let's get Started 
                     </div>
                     <div className=" w-full flex flex-col  gap-4 tracking-wider ">
                       <div className=" flex flex-col gap-2 ">
                       <div className=" px-3 text-black">Name</div>
                       <input type="text" placeholder="Enter Your Name" ref={nameRef} className=" p-3 rounded-xl  border-2  border-solid  border-slate-400 text-black   font-medium  w-full" />
                       </div>
                       <div className=" flex flex-col gap-2 ">
                       <div className=" px-3 text-black">Email Address</div>
                       <input type="text" placeholder="Enter Your Email" ref={emailRef} className=" p-3 rounded-xl  border-2  border-solid  border-slate-400 text-black  font-medium  w-full" />
                       </div>
                       <div className=" flex flex-col gap-2 ">
                       <div className=" px-3 text-black">Password</div>
                       <input type="text" placeholder="Enter Your password" ref={passwordRef} className=" p-3 rounded-xl  border-2  border-solid  border-slate-400 text-black   font-medium  w-full" />
                       </div>
                     </div>
                     <button onClick={handlesignup} className=" tracking-wider w-full text-center hover:bg-blue-800 cursor-pointer bg-primarybtn text-white font-normal rounded-xl p-2">SignUp</button>
                     <div>Already have an account ? <span onClick={ ()=>navigate('/signin')} className=" text-blue-500  cursor-pointer  hover:text-primarybtn">SignIn</span></div>
        </div>

       </div>

       
    </div>
  )
}

export default Signup
