


import  { useEffect, useState } from 'react'
import Profile from './ui/Profile'
import AsyncBrainLogo from './ui/Logo'
import Icons from './ui/Icons'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import Sidebar from './Sidebar'

import { DataArray } from '../util/contenttype'
import ShareContent from './ShareContent'

import { useParams } from 'react-router'

const ShareBrain = () => {
    const [isopenSidebar,setisopenSidebar] = useState<boolean>(false)
       const [selected, setSelected] = useState<string>('all notes')
       const param = useParams()
       const [userInfo, setuserInfo] = useState<{name:string,email:string}| null>(null)
       const [data,setData] = useState<DataArray>([])
       const [content, setContent]  = useState<DataArray>([])
       
  const [Loader,setLoader] = useState<boolean>(false)
  
  useEffect(()=>{
    const getdata = async ()=>{
      try {
        const url = import.meta.env.VITE_API_URL;
       
    
        setLoader(true)
        const response = await  axios.get(`${url}/share/${param.id}`,{
         
        })
        
        if(response.status>200){
          toast(response.data.message)
          setLoader(false)
          return
        }
        
        setContent(response.data.data)
        setuserInfo(response.data.user)
        setLoader(false)

      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(error?.response?.data?.message)
          setLoader(false)
        }
        else{
          setLoader(false)
          throw(error)
        }
      }
    }

    getdata()
  },[])
  useEffect(()=>{
    if(selected==='all notes')setData(content);
    else{
       const temp = content.filter((ele)=>ele?.type===selected)
       setData(temp)
    }
  },[content,selected])
     
  return (
    <div className=" flex flex-col  w-screen min-h-screen  bg-white   ">
      <div className=" w-screen h-16  flex  items-center justify-between  pl-2.5 ">
        <div className="flex gap-2 items-center">

        <div onClick={()=>{setisopenSidebar((prev)=>!prev)}} className=" cursor-pointer hover:text-black text-gray-600 rounded-full sm:p-2.5  p-1 bg-gray-200">
        <Icons name="menu"/>
        </div>
        
      <AsyncBrainLogo props={()=>setSelected('all notes')}/>

        <ToastContainer/>


        </div>
        <div className="  sm:mr-6 flex sm:gap-4 gap-1 items-center justify-center ">
          <Profile name={userInfo?userInfo.name:''} email={userInfo?userInfo.email:''}/>
         
        </div>

      </div>
      <div className=" flex w-screen   h-full">


      
      <Sidebar isopen={isopenSidebar} selected={selected} setSelected={setSelected}/>
      
      <ShareContent Loader={Loader} data={data} line={selected} name={userInfo?userInfo.name :null} />
      </div>
    </div>
  )
}

export default ShareBrain
