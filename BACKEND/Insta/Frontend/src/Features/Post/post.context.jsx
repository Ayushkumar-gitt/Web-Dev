import { createContext, useState } from "react";

export const postContext = createContext()

export const PostContextProvider = ({ children }) => {
    const [feed, setfeed] = useState(null)
    const [loading, setloading] = useState(false)
    const [post, setpost] = useState(null)

    return(
        <postContext.Provider value={{feed,loading,post,setpost,setfeed,setloading}}>
            {children}
        </postContext.Provider>
    )
}