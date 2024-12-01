import React,{useContext, useEffect, useState} from "react";
import { createPortal } from "react-dom";
import "./Resignation.css"
import {enqueueSnackbar} from 'notistack'
import { context } from "../../App";

const Resignation = ({setShowRform,setUserResign})=>{
    const [rDate,setRdate] = useState('');
    const [rReason,setRreason] = useState('');
    const {load,setLoad} = useContext(context)
    // const [resignData,setResignData] = useState({lwd:"",reason:""})
    useEffect(()=>{
        document.body.style.scroll = "none";
        return ()=>{                                   //side effects of previous render cleaned before running the side effect for current render
            document.body.style.scroll = "scroll";
        }
    },[])


    const handleResignForm = (e)=>{
        e.preventDefault();
        // ?let ele = e.target;
        // console.log(ele.elements['rdate'].value,ele.elements['rreason'].value);
        // setResignData({lwd:rDate,reason:rReason})
        postResignation()
        
    }

    const postResignation = async()=>{
        try{
            let token = localStorage.getItem('token');
            // console.log(resignData)
            let response = await fetch('http://localhost:8080/api/user/resign',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({lwd:rDate})
            })
            let data = await response.json();
            // setResData(data)
            console.log(data,'data posting reignation');
            setUserResign({lwd:data.lwd,status:'pending'})
            // localStorage.setItem('userinfo',JSON.stringify({lwd:data.lwd,reason:data.reason}));
           
            enqueueSnackbar('Resignation Sent',{
                variant:'success',
                autoHideDuration:3000,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'center'
                }
            })
            setShowRform(false)
            // setLoad(Date.now())
        }
        catch(err){
            console.log(err.message)

        }
    }

    // useEffect(()=>{
    //     if(resignData.lwd != '')
    //     postResignation(resignData)

    // },[resignData])
    return createPortal(
        <>
        <div className="modalWrapper" onClick={()=>setShowRform(false)}></div>
            <div className={`modal-content d-flex flex-column`}>
                <h1>Resign Form</h1>  
                <form onSubmit={handleResignForm}>
                    <label htmlFor="rdate">Last working Day</label><br /><br />
                    <input type="date" id="rdate" name="rdate" value={rDate} onChange={(e)=>setRdate(e.target.value)} required/><br /><br />
                    <label htmlFor="rreason">Reason</label><br /><br />
                    <textarea type="text" name="rreason" id="reason" value={rReason} onChange={(e)=>setRreason(e.target.value)} required/><br/><br />
                    <button type="submit" id="send">Send</button><br /><br />
                    <div style={{"display":"flex","justifyContent":"space-around"}}>
                       <button onClick={()=>setShowRform(false)} id="close">close</button>
                    </div>
                </form>
               
            </div>
        </>,document.querySelector(".portal")
    )
}
export default Resignation;