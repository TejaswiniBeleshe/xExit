import React, { useState } from "react";
import {useNavigate,Link} from 'react-router-dom';
import { enqueueSnackbar } from "notistack";
import "../Login/Login.css"
const Register = ()=>{
    const navigate = useNavigate()
    const [username,setUsername] = useState('');
    // const [uEmail,setUemail] = useState('');
    const [uPassword,setUpassword] = useState('');
    

    const handleRegister = async(e)=>{
        e.preventDefault()
       
        try{
            let res = await fetch('http://localhost:8080/api/auth/register',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username:username,password:uPassword})
            })

            let data = await res.json();
            console.log(data)
            if(data && data.message === 'user exit'){
                enqueueSnackbar('User already exist please login',{
                    variant:'warning',
                    autoHideDuration:3000,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'center'
                    }
                })
            }
            if(data && data.message == "User registered successfully"){
                // localStorage.setItem('token',data.token)
                enqueueSnackbar("User registered successfully",{
                    variant:'success',
                    autoHideDuration:3000,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'center'
                    }
                })
                navigate('/');
                window.history.pushState(null, '', window.location.href);
                    window.onpopstate = function () {
                      window.history.go(1);  // Prevent back navigation
                };
                return 
               
            }
            // throw new Error(data)
        }
        catch(err){
            // console.log(err);
            enqueueSnackbar(err.message,{
                variant:'error',
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
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <label htmlFor="rname">User Name</label><br/>
            <input type="email" id="rname" name="rname" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/><br/><br/>
            {/* <label htmlFor="remail">Email</label><br/>
            <input type="email" id="remail" name="remail" value={uEmail} onChange={(e)=>{setUemail(e.target.value)}} required/><br/><br/> */}
            <label htmlFor="upassword">Password</label><br/>
            <input type="password" id="rpassword" name="rpassword" value={uPassword} onChange={(e)=>setUpassword(e.target.value)} required/><br/><br/>
            <button type="submit" id="r-btn">Register</button><p> want to<Link to='/'> login</Link></p>
        </form>
        </>
    )
}

export default Register;