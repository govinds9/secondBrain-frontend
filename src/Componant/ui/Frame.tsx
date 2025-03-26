
import Doccard from "./Doccard";
import Twitter from "./Twitter";
import Youtube from "./Youtube";



interface frameprops{
    type:string,
    link:string,
    description?:string | undefined,
    image?:string| undefined
}
const Frame = (props:frameprops) => {
  
  
    
      switch (props.type) {
    case "youtube":
      return <Youtube link={props.link}/>
    case "twitter":
      return <Twitter link={props.link} />;
      case "document" :
        return <Doccard link= {props.link}  description={props.description}  image={props.image} />
      case "links" :
          return <Doccard link= {props.link}  description={props.description}  image={props.image} />
        
      }

  
};

export default Frame
