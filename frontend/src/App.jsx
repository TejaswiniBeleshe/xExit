import React from 'react'
import './App.css'
import {Link,Outlet} from 'react-router-dom'

function App() {
  return (
    <>
     {/* <Link to='/login'>Login</Link>
     <Link to='/register'>Register</Link>
     <Link to='/admin'>admin</Link>
     <Link to='/employee'>employee</Link> */}
     <Outlet/>   
    </>
  )
}

export default App;
