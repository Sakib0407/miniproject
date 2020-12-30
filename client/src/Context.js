import React, { useState } from "react";


import axios from "axios";
export const UserContext = React.createContext();


export const Context = ({ children }) => {
  const initialState = {
    name: "",
    summary: "",
    cost: 0,
    date: "",
  };
  const [api, setApi] =useState()
  const [tax, setTax] =useState(0)
  const fetch = async () => {
    const { data } = await axios.get("http://localhost:3000/project");
    setApi(data)
  };

console.log(api)
  
  const value = {
    api,fetch,setTax,tax
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default Context;
