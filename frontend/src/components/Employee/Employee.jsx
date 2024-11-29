import React, { useState,useContext, useEffect } from 'react';
import Resignation from '../Resignation/Resignation.jsx';
import {enqueueSnackbar} from 'notistack';
import './Employee.css';
import Card from '../Card/Card.jsx';
import { useNavigate } from 'react-router-dom';
import { context } from "../../App";
import { FcApproval } from "react-icons/fc";
import { RiChatDeleteFill } from "react-icons/ri";
const Employee = ()=>{
    const navigate = useNavigate()
    const [showRform,setShowRform] = useState(false);
   
    const {load,setLoad} = useContext(context);
    
    const [userResign,setUserResign] = useState({})
    const handleDelete = async()=>{
        try{
            let data = await fetch('http://localhost:8082/api/user/resign',{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            let res = await data.json();
            // localStorage.removeItem('userinfo');
            // setLoad(Date.now())
            
            if(res){
                enqueueSnackbar('Removed',{
                    variant:'success',
                    autoHideDuration:3000,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'center'
                    }
                })
            }
            setUserResign({})
        }
        catch(err){
            console.log(err)
        }
    }

   
    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        // localStorage.removeItem('userinfo')
        navigate('/')
    }

    const getResinationOfUser = async()=>{
        try{
            let data = await fetch('http://localhost:8082/api/user/resignation',{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            });
            let resign = await data.json();
            if(resign.lwd){
                // console.log(resign);
                setUserResign({reason:resign.reason,lwd:resign.lwd,status:resign.status})
            }

        }
        catch(err){
            console.log(err)

        }
    }

    useEffect(()=>{
       getResinationOfUser();
       console.log(userResign)
    },[])

    return(
        <div className='card-main'>
            <h1 className='emp-heading'>EMPLOYEE DASHBOARD</h1>
            <div className='btns'>
            <button onClick={handleLogOut} className='emp-btn'>Logout</button>
            {!userResign.lwd?<button onClick={(e)=>setShowRform(true)} id='res-btn'>Resign</button>:''}
            </div>
            <div className='resign-cards'>
                {userResign.lwd?<div className='wrap'>{userResign.status==='true'?<>Approved <FcApproval /></>:userResign.status==='false'?<><button onClick={handleDelete} id='delete'>Delete</button><RiChatDeleteFill /></>:<button onClick={handleDelete} id='delete'>Delete</button>}<br /><Card userResign={userResign} /></div>:""}
            </div>
            {showRform?<Resignation setShowRform={setShowRform} setUserResign={setUserResign}/>:''}
        </div>
    )
}

export default Employee;