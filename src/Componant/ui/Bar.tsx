import Icons from "./Icons"
const temp:{[key:string]:any}={
  "youtube":{
    type:"youtube",
    name:"Youtube"
  },
  "twitter":{
    type:"twitter",
    name:"Tweets"
    
  },
  "document":{
    type:"document",
    name:"Document"
  },
  "links":{
    type:"links",
    name:"Links"
  },
  "all notes":{
    type:"all notes",
    name:"All Notes"
  }
}
 
 interface Barprops{
    isopen:boolean,
    selected:string,
    name:string
 }
 const Bar = (props:Barprops) => {
   return (
     <div  className={`flex  cursor-pointer items-center sm:gap-3 font-normal gap-1   ${props.selected===temp[props.name].type ?" text-black  font-semibold bg-secondarybtn":"text-slate-600 hover:bg-gray-200 "}   tracking-tight  ${props.isopen?"rounded-r-full justify-self-auto":"rounded-full w-11 h-11 ml-3 justify-center"} py-1 sm:mr-4 mr-1`}>


       <Icons name={temp[props.name].type} />


{
    props.isopen?<h1>{temp[props.name].name} </h1>: null
}
       



       
     </div>
   )
 }
 
 export default Bar
 