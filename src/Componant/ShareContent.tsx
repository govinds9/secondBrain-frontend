

import Card from "./ui/Card";

import { DataArray } from "../util/contenttype";
import Spinner from "./ui/Spinner";




const temp:{[key:string]:string}={
  "youtube":"Youtube",
  "twitter":"Tweets",
  "document":"Documents",
  "links":"Links",
  "all notes":"All Notes"
}


const ShareContent = (props:{
  Loader:boolean,
  data:DataArray,
  line:string,
  name:string|null
}) => {
  
  
  
  return (
    <div className= {`flex-1   w-full  h-screen  bg-bglight  border-2 border-gray-200 flex flex-col rounded-s-3xl  gap-6 sm:p-10 pl-1 pb-1`} >
      <div className=" w-full  h-min   py-3 flex  gap-2 sm:justify-between  flex-col items-center  justify-center ">
{props.name?<h1 className="sm:text-5xl  text-2xl font-bold text-black tracking-widest ">You Are Into <span className="   text-primarybtn">{`${props.name} Brain`}</span></h1>:null}
        <h1 className=" sm:text-4xl text-xl font-semibold  tracking-tight ">
          
          {temp[props.line]}
        </h1>

       

      </div>
     { props.Loader?<div className=" flex items-center justify-center">
           <Spinner/>
        </div> :null}
      <div className=" w-full h-min py-2 flex flex-wrap sm:justify-normal justify-center  gap-8  text-black text-xl overflow-y-auto ">
       {
       props.data.map((ele, index)=><div key={index}><Card data={ele} deleteoption={false}/> </div>)
       }
      
      </div>
    </div>
  );
};

export default ShareContent;
