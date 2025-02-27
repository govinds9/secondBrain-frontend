import React from 'react'
import { useRecoilValue } from 'recoil'
import {   user } from '../store/store'
import { Navigate } from 'react-router'

interface childprops{
    children:   React.ReactNode
}
const Protectedroute = (props:childprops) => {
    const isauth = useRecoilValue(user)
   
    
    if(isauth===null){
        return <Navigate to={'/signin'}/>
    }
  return props.children
   
  
}

export default Protectedroute
