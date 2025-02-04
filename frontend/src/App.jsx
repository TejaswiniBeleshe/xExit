import React, { createContext, useState } from 'react'
import './App.css'
import {Link,Outlet} from 'react-router-dom'
// import EmployeeRes from './components/EmployeeRes/EmployeeRes';
export const context = createContext();

export const config = {
  endpoint:"https://xexit-1.onrender.com/api"
}

function App() {
  const [load,setLoad] = useState('')
  return (
    <context.Provider value={{load,setLoad}}>
   
     {/* <Link to='/login'>Login</Link>
     <Link to='/register'>Register</Link>
     <Link to='/admin'>admin</Link>
     <Link to='/employee'>employee</Link> */}
     <Outlet/>
     </context.Provider>   
    
  )
}

export default App;
