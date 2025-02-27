import { ReactElement } from "react"





export interface ButtonProps{
    variant:"primary"| "secondary",
    size:"sm"| "md" |"lg",
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    loading?:boolean,
    onClick?:()=>void
}

const variant = {
  "primary":" bg-primarybtn  text-white  font-light hover:text-white hover:bg-slate-900 ",
   "secondary":"bg-secondarybtn  text-secondarytxt  font-normal hover:bg-secondarytxt hover:text-secondarybtn "
}
const size = {
  "sm" : "sm:text-sm sm:py-2 sm:px-3 px-2 py-1 rounded-lg",
  "md" :"sm:text-lg text-sm sm:py-2 sm:px-4 px-2 py-1 rounded-lg  ",
  "lg":"sm:text-xl text-sm sm:py-3 sm:px-6 px-2 py-1 rounded-lg "
}


const Button = (props:ButtonProps) => {
  return (
    


   
    <button onClick={props.onClick} disabled={props.loading} className={`${variant[props.variant]} ${size[props.size]}  tracking-tight  hover:transition-all hover:duration-500  `} >
       
       
  

      <div className=" flex items-center justify-center gap-2">
       {props.startIcon}
       {props.text}
     
      </div>

     
    </button>

  
  )
}

export default Button
