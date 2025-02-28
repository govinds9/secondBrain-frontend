
import { useState } from "react";
import Button from "./Button";
import Icons from "./Icons";
import Spinner from "./Spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { user } from "../../store/store";

const LinkCard = (props:{
    id:string | null,
    setShowCard:any
}) => {
    const [ load, setLoad] = useState(false)
    const setUser = useSetRecoilState(user)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://secondbrainit.netlify.app/brainshare/:${props.id}`);
        alert('Link copied to clipboard!');
      };
      const handleCreate = async ()=>{
        try {
          const url = import.meta.env.VITE_API_URL;
          const token = localStorage.getItem('token')
          setLoad(true)
          const response = await  axios.get(`${url}/link`,{

            headers:{
              Authorization: `Bearer ${token}`
            }
            
          })
          if(response.status>200){
             toast(response.data.message)
                      setLoad(false)
                      return
          }
          const data = await axios.get(`${url}/me`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
             
            if(data.status===200){
            
              setUser(data.data.data.user)
              setLoad(false)
              toast.success(response.data.message)
            }

        } catch (error) {
          if(axios.isAxiosError(error)){
            toast.error(error?.response?.data?.message)
            setLoad(false)
          }
          else{
            setLoad(false)
            throw(error)
          }
          
        }
      }
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-2xl shadow-xl sm:p-6  px-2 py-6 md:w-2/5 sm:w-4/5 w-full relative">
      <button
        className="absolute top-3 right-4 text-gray-600 hover:text-gray-900"
        onClick={() => props.setShowCard(false)}
      >
        ✖
      </button>
      <ToastContainer/>
     
      {props.id? <div><h3 className="text-xl font-semibold mb-4">Share this link</h3>
      <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          value={`https://secondbrainit.netlify.app/brainshare/:${props.id}`}
          readOnly
          className="w-full tracking-tighter bg-transparent outline-none md:text-xl text-sm"
        />
        <button
          className="ml-2 text-blue-600 hover:text-blue-800"
          onClick={copyToClipboard}
        >
          copy
        </button>

        
      </div></div>:
    <div className={` flex flex-col justify-center  ${load?'items-center':''} mt-3`}><h3 className="text-xl font-semibold mb-4 text-center">Create your link to share brain</h3>
    { load?<Spinner/>: <Button
            text="Create Link"
            variant="primary"
            startIcon={<Icons name="links" />}
            size="md"
            onClick={handleCreate}
          />}
    </div>}
    </div>
  </div>
  )
}

export default LinkCard
