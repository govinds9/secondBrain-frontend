

const youtube=(link:String)=>{
    return(
    <div className="rounded-xl w-30 h-40" >
    <iframe
        className=" w-full rounded-lg cursor-pointer"
        src={"https://www.youtube.com/embed/"+link.replace('https://youtu.be/','')}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </div>
      )
}
const twitter = (link:string)=>{
  console.log(link.replace("x","twitter"))
  return(
    <div
       
    className="overflow-y-auto  h-[80%] text-gray-600"
  >
   
    <blockquote className="twitter-tweet">
<a href={link.replace("x","twitter")} ></a> 
</blockquote>
  </div>
  
  )
}
const frames:{[key:string]:any}={
    "youtube":youtube,
    "twitter":twitter
}

interface frameprops{
    type:string,
    link:string
}
const Frame = (props:frameprops) => {
  
  return (
    <>
      {frames[props.type](props.link)}
    </>
  );
};

export default Frame;
