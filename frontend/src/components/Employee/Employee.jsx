import React, { useState,useContext, useEffect } from 'react';
import Resignation from '../Resignation/Resignation.jsx';
import {enqueueSnackbar} from 'notistack';
import './Employee.css';
import Card from '../Card/Card.jsx';
import { useNavigate } from 'react-router-dom';
import { context } from "../../App";
import { FcApproval } from "react-icons/fc";
import { RiChatDeleteFill } from "react-icons/ri";
import ExitQuestions from '../ExitQuestions/ExitQuestions.jsx';
import QRCard from '../QRCard/QRCard.jsx';
import { config } from '../../App';
const Employee = ()=>{
    const navigate = useNavigate()
    const [showRform,setShowRform] = useState(false);
    const [showQuest,setShowQuest] = useState(false);
    const [allQR,setAllQR] = useState([]);
    const [qRresponse,setQRresponse] = useState('')
   
    const {load,setLoad} = useContext(context);
    
    const [userResign,setUserResign] = useState({})
    const handleDelete = async()=>{
        try{
            let data = await fetch(`${config.endpoint}/user/resign`,{
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
            enqueueSnackbar(err.message,{
                variant:'error',
                autoHideDuration:2000,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center'
                }
            })
        }
    }

   
    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        // localStorage.removeItem('userinfo')
        navigate('/')
    }

    const getResinationOfUser = async()=>{
        try{
            let data = await fetch(`${config.endpoint}/user/resignation`,{
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
            enqueueSnackbar(err.message,{
                variant:'error',
                autoHideDuration:2000,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center'
                }
            })

        }
    }

    const sendUserResponse = async()=>{
        try{
            let data = await fetch(`${config.endpoint}/user/responses`,{
                method:"POST",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(allQR)
            })
            // let resp = await data.json();
            // console.log(resp);
           
            // console.log(data)
            if(data.status == 200){
                setQRresponse(allQR)
                enqueueSnackbar('Sent to HR',{
                    variant:'success',
                    autoHideDuration:2000,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'center'
                    }
                })
                return
            }
            enqueueSnackbar('unable to send HR',{
                variant:'error',
                autoHideDuration:2000,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center'
                }
            })
        }
        catch(err){
            // console.log(err)
            enqueueSnackbar(err.message,{
                variant:'error',
                autoHideDuration:2000,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center'
                }
            })

        }
    }

    const getUserQR = async()=>{
        try{
            let data = await fetch(`${config.endpoint}/user/responses`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            let res = await data.json();
            // console.log('getall response',res)
            if(res){
                setQRresponse(res.responses)
            }
            // throw new Error('error')
            
        }
        catch(err){
            enqueueSnackbar(err.message,{
                variant:'error',
                autoHideDuration:2000,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center'
                }
            })
        }
    }
    useEffect(()=>{
        if(allQR[0]){
            sendUserResponse()
        }
    },[allQR])
    
    useEffect(()=>{
       getResinationOfUser();
    //    console.log(userResign)
       getUserQR()
    },[])


    return(
        <div className='card-main'>
            <h1 className='emp-heading'>EMPLOYEE DASHBOARD</h1>
            {!userResign.lwd?<p>You have not submitted your resignation yet. If you're planning to resign, please complete the resignation process.</p>:""}
            <div className='btns'>
            <button onClick={handleLogOut} className='emp-btn'>Logout</button>
            {!userResign.lwd?<button onClick={(e)=>setShowRform(true)} id='res-btn'>Resign</button>:''}
            </div>
            <div className='resign-cards'>
                {userResign.lwd?<div className='wrap'>{userResign.status==='true'?<div style={{"width":"100%","display":"flex","justifyContent":"space-around",}}><div style={{"textAlign":"left","marginTop":"1rem"}}>APPROVED</div><button className='q-btn' onClick={(e)=>setShowQuest(true)}>Questionnaira</button></div>:userResign.status==='false'?<><button onClick={handleDelete} id='delete'>Delete</button><RiChatDeleteFill /></>:<button onClick={handleDelete} id='delete'>Delete</button>}<br /><Card userResign={userResign} /></div>:""}
                {qRresponse?<div className='r-card' style={{"textAlign":"start"}}>{qRresponse.map((ele,i)=><QRCard questionText={ele.questionText} i={i} response={ele.response}/>)}</div>:''}
            </div>
            {showRform?<Resignation setShowRform={setShowRform} setUserResign={setUserResign}/>:''}
            {showQuest?<ExitQuestions setShowQuest={setShowQuest} setAllQR={setAllQR}/>:''}
        </div>
    )
}

export default Employee;