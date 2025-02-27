import { useEffect, useState } from "react"
import Content from "./Content"
import Sidebar from "./Sidebar"
import Icons from "./ui/Icons"
import AsyncBrainLogo from "./ui/Logo"
import Profile from "./ui/Profile"
import Button from "./ui/Button"
import { useNavigate } from "react-router"
import { useRecoilState } from "recoil"
import { contents, user } from "../store/store"
import axios from "axios"
import { toast } from "react-toastify"
import { DataArray } from "../util/contenttype"




const Layout = () => {
       const [isopenSidebar,setisopenSidebar] = useState<boolean>(false)
       const [selected, setSelected] = useState<string>('all notes')
       const navigate = useNavigate()
       const [userInfo,setuserInfo] = useRecoilState(user)
       const [data,setData] = useState<DataArray>([])
       const [content, setContent] = useRecoilState(contents)
  const [Loader,setLoader] = useState<boolean>(false)
  useEffect(()=>{
    const getdata = async ()=>{
      try {
        const url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token')
        setLoader(true)
        const response = await  axios.get(`${url}/allcontent`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        
        if(response.status>200){
          toast(response.data.message)
          setLoader(false)
          return
        }
        setContent(response.data.data)
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
        </div>
        <div className="  sm:mr-6 flex sm:gap-4 gap-1 items-center justify-center ">
          <Profile name={userInfo?userInfo.name:''} email={userInfo?userInfo.email:''}/>
          <Button text="Sign Out" variant="secondary" onClick={()=>{localStorage.removeItem("token")
            setuserInfo(null)
            navigate('/signin')

          }} size="md"/>

        </div>

      </div>
      <div className=" flex w-screen   h-full">


      
      <Sidebar isopen={isopenSidebar} selected={selected} setSelected={setSelected}/>
      
      <Content Loader={Loader} data={data} line={selected} />
      </div>
    </div>
  )
}

export default Layout
