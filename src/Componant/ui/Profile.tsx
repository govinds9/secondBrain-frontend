

interface profileprops{
    name:string,
    email:string
}

const Profile = (props:profileprops) => {
  return (
    <div className=" flex  items-center justify-center gap-2">
        <div onClick={()=>{}} className=" rounded-full sm:w-12 sm:h-12  w-8 h-8 flex items-center justify-center  border-4 border-gray-200 bg-red-500 ">
            

            {props.name.charAt(0).toUpperCase()}
            

        </div>
        <div className=" sm:flex flex-col hidden   font-light text-black mr-3 ">
            <h5 className=" font-medium" >{props.name.toUpperCase()}</h5>
            <p>{props.email}</p>

        </div>
       
    </div>
  )
}

export default Profile
