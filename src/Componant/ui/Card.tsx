import { toast, ToastContainer } from "react-toastify";
import { DataItem } from "../../util/contenttype";
import Frame from "./Frame";
import Icons from "./Icons";
import axios from "axios";
import { useState } from "react";
import Spinner from "./Spinner";
import { useSetRecoilState } from "recoil";
import { contents } from "../../store/store";



const Card = (props:{
  data:DataItem,
  deleteoption:boolean
}) => {
  
  const [deleteload,setDeleteload] = useState<boolean>(false)
  const setContent = useSetRecoilState(contents)
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
 const handleDelete = async (_id:string)=>{
    try {
      const url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token')
        setDeleteload(true)
      const response = await axios.delete(`${url}/deletecontent/:${_id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
        
      })
      if(response.status>200){
          toast(response.data.message)
          setDeleteload(false)
      }
      const toastoption = {
        onClose:async ()=>{ setDeleteload(false)
          const url = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('token')
        
        const response = await  axios.get(`${url}/allcontent`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        
        if(response.status>200){
         
          return
        }
        setContent(response.data.data)
       

        },
        autoClose:2000
      }
      toast.success(response.data.message,toastoption)

    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error?.response?.data?.message)
        setDeleteload(false)
      }
      else{
        setDeleteload(false)
        throw(error)
      }
    }
 }
  return (
    <div className={` flex flex-col gap-2  m-2 rounded-xl p-3  bg-white   sm:w-[20rem]  w-11/12  h-96 border-2  border-gray-200  relative   `}>
      <div className=" flex w-full items-center justify-between">
       <a href={props.data.link} target="_blank"> <div className=" flex items-center tracking-tight font-semibold gap-2  text-gray-600 cursor-pointer hover:text-red-500 ">
          <Icons name={props.data.type} />
          <span className=" text-slate-800">{props.data.title}</span>
        </div>

       </a>
       { props.deleteoption ?<div onClick={()=>handleDelete(props.data._id)}  className=" text-gray-600 cursor-pointer hover:text-red-600">
          {deleteload?<Spinner/>:<Icons name="delete" />}
        </div>:null}
      </div>
      
     { props.data.type ==="document" || "links"?<Frame type={props.data.type} link={props.data.link} description={props.data.description} image={props.data.image} />:<Frame type={props.data.type} link={props.data.link}  />}
        
     
      <div className=" flex  w-full flex-wrap gap-2 ">
        {props.data.tags.map((ele,index)=> <div key={index} className=" rounded-full px-2 py-1 text-secondarytxt bg-secondarybtn tracking-tight text-sm  text-center ">
          #{ele.title}
        </div>)}
       
      </div>
      <div className=" w-full tracking-tighter text-sm text-gray-400  absolute    bottom-2">
        {formatDate(props.data.createdAt)}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Card;
