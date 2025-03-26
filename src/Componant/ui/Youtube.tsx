

const Youtube = (props:{
    link:string
}) => {
  return (
    <div className="rounded-xl w-30 h-40" >
    <iframe
        className=" w-full rounded-lg cursor-pointer"
        src={"https://www.youtube.com/embed/"+props.link.replace('https://youtu.be/','')}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      </div>
  )
}

export default Youtube
