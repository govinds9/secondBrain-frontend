import { useEffect } from "react";


const Twitter = (props:{
    link:string
}) => {
  useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script); // Cleanup to prevent duplicate scripts
      };
    }, []);
    return(
      <div
         
      className="overflow-y-auto w-30  h-[80%] text-gray-600"
    >
     
      <blockquote className="twitter-tweet">
  <a href={props.link.replace("x","twitter")} ></a> 
  </blockquote>
    </div>
    
    )
}

export default Twitter
