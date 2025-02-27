import React, { LegacyRef } from "react"

interface Inputprops{
    placeholder?:string,
    type:string,
    value?:string,
    refrence:any,
    onchange?:()=>void,
    className?:string,
}



const Input = (props:Inputprops) => {
  return (
    <div>
        <input type={props.type} ref={props.refrence} value={ props.value} onChange={ props.onchange} placeholder={props.placeholder} className={`${props.className} py-2 px-2 rounded-md border-2 border-secondarytxt  text-black font-mono `} ></input>
      
    </div>
  )
}

export default Input
