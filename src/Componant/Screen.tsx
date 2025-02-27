import axios from "axios";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { contents } from "../store/store";

interface screenprops{
  isopen:boolean,
  setisopen:any
}
const Screen = (props:screenprops) => {
  if (!props.isopen) return null;
  const [title, settitle] = useState('')
  const [link, setLink] = useState('')
  const [type,setType] = useState('youtube')
  const [tags,setTags] = useState<(string |undefined)[]>([])
  const tagref = useRef<HTMLInputElement>(null);
  const [Loading, setLoading] = useState(false)
  const setContent = useSetRecoilState(contents)
  const handleSubmit =  async () =>{
    if(title==='' || link==='' ){
      toast.error("All fields Are required")
    }
    setLoading(true)
    try {
      const url = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem('token')
      const data = await axios.post(`${url}/content`,{
    
    title,
    link,
    type,
    tags
  },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  }) 

    if(data.status>200){
      toast.error(data?.data?.message)
      setLoading(false)
      return
    }
    const toastoption = {
      onClose:async ()=>{  setLoading(false)
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
     
      props.setisopen(false)
      },
      autoClose:2000
    }
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
   
    <div
      className="  fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={()=>props.setisopen(false)}
    >
      <div
        className=" relative  w-full max-w-lg p-6 bg-white rounded-lg shadow-lg sm:max-w-md md:max-w-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={()=>props.setisopen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold text-center md:text-2xl">
          Content Form
        </h2>
        <form className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              onChange={(e)=>settitle(e.target.value)}
              value={title}
              id="title"
              type="text"
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your title"
            />
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <input
              id="link"
              type="text"
              onChange={(e)=>setLink(e.target.value)}
              value={link}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your link"
            />
          </div>
          <div>
            <label
              htmlFor="contenttype"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Content
            </label>
           <select  id="contenttype" onChange={(e)=>setType(e.target.value)} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm  cursor-pointer">
            <option value={"youtube"}  >Youtube</option>
            <option value={"twitter"} >Twitter</option>
            <option value={"document"} >Document</option>
            <option value={"links"} >Links</option>

           </select>
          </div>
          <div className=" flex  w-full flex-wrap gap-2 ">
            {
              tags.map((ele,index)=><div key={index} className=" rounded-full px-2 py-1 text-secondarytxt bg-secondarybtn tracking-tight text-sm  text-center ">
              #{ele}
            </div>)
            }
        
      
      </div>
      <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Add Tags
            </label>
            <input
              id="tags"
              type="text"
             ref={tagref}
              onKeyDown={(e)=>{
                if(e.key ==='Enter' && tagref?.current?.value.length){
                  const tagv  = tagref.current?.value
                  setTags((prev)=>[...prev,tagv])
                  tagref.current.value =''
                }
              }}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder=" # "
            />
          </div>

        </form>
          <button 
          disabled={Loading}
          
            onClick={handleSubmit}
            className={`w-full mt-5 px-4 py-2 text-white ${Loading?'bg-gray-400':'bg-blue-500 hover:bg-blue-600'} rounded-md `}
          >
            {Loading?<div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>:"Submit"}
          </button>
      </div>
      <ToastContainer/>
    </div>
 
  );
}

export default Screen
