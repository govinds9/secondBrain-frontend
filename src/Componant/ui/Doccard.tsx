

const Doccard = (props:{
    link:string ,
    description:string|undefined,
    image:string|undefined
}) => {
    const desc = props?.description && props.description.length>100?props.description?.slice(0,100):props.description
  return (
    <div className=" rounded-xl w-30   mb-2 flex flex-col gap-2" >
      <div className="flex justify-center items-center ">
      <a href={props.link} target="_blank" >
            
            <img src={props?.image} width={200} height={200} className=" " alt="Image" />
            </a>
      </div>
      <div className=" font-medium text-xl tracking-tighter">

        {
          desc
        }
      </div>
      
    </div>
  )
}

export default Doccard
