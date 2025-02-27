
import Bar from "./ui/Bar"

interface sidebarprops{
  isopen:boolean,
  selected:string,
  setSelected:any
}



const Sidebar = (props:sidebarprops) => {
  const bars = ["all notes","youtube", "twitter","document","links"]
   
  return (
    <div className={`${props.isopen?"  sm:w-48  w-1/3   ":"sm:w-16 w-0"}  bg-white   h-screen text-secondarytxt flex flex-col gap-4 py-10 `}>
      {

        bars.map((ele,index)=>
         <div key={index} onClick={()=>props.setSelected(ele)} >
         <Bar isopen={props.isopen}  selected={props.selected} name={ele}  />
         </div>)

      }      
    
      
     
    </div>
  )
}

export default Sidebar
