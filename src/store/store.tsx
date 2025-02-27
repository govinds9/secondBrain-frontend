import { atom } from "recoil";
import { DataArray } from "../util/contenttype";

interface User {
    id: string;
    name: string;
    email: string;
    link:{
      _id:string,
      userId:string
    }
    
  }
  

export const user = atom<User |null>({
    key:'users',
    default:null
})
export const contents =atom<DataArray>({
  key:"content",
  default:[]
})

