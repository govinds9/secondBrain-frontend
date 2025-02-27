import {  useState } from "react";
import Screen from "./Screen";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Icons from "./ui/Icons";
import { DataArray } from "../util/contenttype";
import Spinner from "./ui/Spinner";

import LinkCard from "./ui/LinkCard";
import { useRecoilValue } from "recoil";
import { user } from "../store/store";

const temp:{[key:string]:string}={
  "youtube":"Youtube",
  "twitter":"Tweets",
  "document":"Documents",
  "links":"Links",
  "all notes":"All Notes"
}


const Content = (props:{
  Loader:boolean,
  data:DataArray,
  line:string
}) => {
  const [open, setOPen]= useState(false)
  const [sharecard ,setsharecard] = useState(false)
  const currentuser =useRecoilValue(user)
  
  return (
    <div className= {`flex-1   w-full  h-screen  bg-bglight  border-2 border-gray-200 flex flex-col rounded-s-3xl  gap-6 sm:p-10 pl-1 pb-1`} >
      <div className=" w-full  h-min   py-3 flex  gap-2 sm:justify-between flex-wrap items-center  justify-center ">
        <h1 className=" sm:text-4xl text-xl font-semibold  tracking-tight ">
          
          {temp[props.line]}
        </h1>

        <div className=" flex items-center sm:flex-row   sm:gap-4 gap-1">
          <Button
            text="Share Brain"
            variant="secondary"
            startIcon={<Icons name="share" />}
            size="md"
            // onClick={async() => {    const url = import.meta.env.VITE_API_URL;
            //   const token = localStorage.getItem('token')
              
            //   const response = await  axios.get(`${url}/link`,{
            //     headers:{
            //       Authorization: `Bearer ${token}`
            //     }
            //   })
            //   console.log(response)
            // }}
            onClick={()=>setsharecard(true)}
          />
          <Button
            text="Add Content"
            variant="primary"
            startIcon={<Icons name="plus" />}
            size="md"
            onClick={() => {setOPen(true)
              
            }}
          />
        </div>
      </div>
      {sharecard && <LinkCard id={currentuser?.link ?currentuser.link._id:null} setShowCard={setsharecard}/>}
      <Screen isopen={open} setisopen={ setOPen}/>
      {props.Loader?<div className=" flex items-center justify-center">
           <Spinner/>
        </div> :null}
      <div className=" w-full h-min py-2 flex flex-wrap sm:justify-normal justify-center  gap-8  text-black text-xl overflow-y-auto ">
       {
        props.data.map((ele, index)=><div key={index}><Card data={ele} deleteoption={true}/> </div>)
       }
      
      </div>
    </div>
  );
};

export default Content;
