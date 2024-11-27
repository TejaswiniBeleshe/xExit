import React, { useState,useContext } from 'react';
import Resignation from '../Resignation/Resignation.jsx';
import {enqueueSnackbar} from 'notistack';
import './Employee.css';
import Card from '../Card/Card.jsx';
import { useNavigate } from 'react-router-dom';
import { context } from "../../App";
const Employee = ()=>{
    const navigate = useNavigate()
    const [showRform,setShowRform] = useState(false);
    const [state,setState] = useState('');
    const {load,setLoad} = useContext(context)
    const handleDelete = async()=>{
        try{
            let data = await fetch('http://localhost:8082/api/user/resign',{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            let res = await data.json();
            // console.log(res)
            localStorage.removeItem('userinfo');
            setLoad(Date.now())
            setState('')
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
        }
        catch(err){
            console.log(err)
        }
    }

    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('userinfo')
        navigate('/')

    }
    return(
        <div>
            <h1 className='emp-heading'>EMPLOYEE DASHBOARD</h1>
            <div className='btns'>
            <button onClick={handleLogOut} className='emp-btn'>Logout</button>
            {!localStorage.getItem('userinfo')?<button onClick={(e)=>setShowRform(true)} id='res-btn'>Resign</button>:''}
            </div>
            
            <div className='resign-cards'>
                {localStorage.getItem('userinfo')?<div className='wrap'><button onClick={handleDelete}>Delete</button><br /><Card state={state} setState={setState}/></div>:""}
            </div>
            {showRform?<Resignation setShowRform={setShowRform}/>:''}
        </div>
    )
}

export default Employee;