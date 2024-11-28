import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import {enqueueSnackbar} from 'notistack'
import './Login.css'
const Login = ()=>{
    const [lname,setLname] = useState('');
    const [lpassword,setLpassword] = useState('');
    const navigate = useNavigate()


    const handleLogin = async(e)=>{
        e.preventDefault()
        try{
            let respond = await fetch('http://localhost:8082/api/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:lname,password:lpassword})
            })
            let data = await respond.json();
            console.log(data)
            if(data._doc.username){
               
                if(data._doc.role === 'employee'){
                    localStorage.setItem('token',data.token)
                    enqueueSnackbar('Employee dashboard',{
                        variant:'success',
                        autoHideDuration:3000,
                        anchorOrigin:{
                            vertical:'top',
                            horizontal:'center'
                        }
                    })
                    navigate('/employee');
                    window.history.pushState(null, '', window.location.href);
                    window.onpopstate = function () {
                      window.history.go(1);  // Prevent back navigation
                    };
                    return 
                }
                enqueueSnackbar('Admin dashboard',{
                    variant:'success',
                    autoHideDuration:3000,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'center'
                    }
                })
                localStorage.setItem('token',data.token)

                navigate('/admin');

                window.history.pushState(null, '', window.location.href);
                window.onpopstate = function () {
                  window.history.go(1);  // Prevent back navigation
                };
                return 
                
            }
        }
        catch(err){
            enqueueSnackbar(err.message,{
                variant:"error",
                autoHideDuration:3000,
                anchorOrigin:{
                    horizontal:'center',
                    vertical:'top'
                }
            })
        }
    }
    return(
        <>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor="lname">User Name</label><br/>
            <input type="text" id="lname" name="lname" value={lname} onChange={(e)=>setLname(e.target.value)} /><br/><br/>
            <label htmlFor="lpassword">Password</label><br/>
            <input type="password" id="lpassword" name="lpassword" value={lpassword} onChange={(e)=>setLpassword(e.target.value)}/><br/><br/>
            <button type="submit" id="l-btn">Login</button><br/>
            <p>
             Haven't Register? <Link to='/register'><span style={{'fontSize':'500'}}>Register</span></Link>
            </p>
        </form>
        </>
    )
}
export default Login;