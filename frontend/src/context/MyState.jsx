import { useState } from "react"
import MyContext from "./myContext"

const MyState=(props)=>{
    const[search,setSearch]=useState("")
    return(
        <MyContext.Provider value={{search,setSearch}} >
            {props.children}
        </MyContext.Provider>
    )
}
export default MyState;
