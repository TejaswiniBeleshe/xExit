import React, { useEffect, useState,useContext } from "react";
import { MdDangerous } from "react-icons/md";
import Reject from "../Reject/Reject";
import "./Record.css"
import { context } from "../../App";
import {enqueueSnackbar} from 'notistack'

const rej = `
    Dear Employee,
    
    We have reviewed your resignation letter dated . After careful consideration of current circumstances and discussions with the management team, we are unable to accept your resignation at this time.
    
    We value your role and contributions to [Company Name]. Please let us know if there are concerns or issues that we can address to support you better. We are open to a discussion to ensure mutual satisfaction and alignment moving forward.
    
    Best regards,
    HR
    XYZ Company
    `
    const acc = `
    Dear Employee,
    
    We have received and reviewed your resignation letter dated. After due consideration, we accept your resignation, effective .
    
    We appreciate your contributions during your time with XYZ Company and wish you the best in your future endeavors. If you require any assistance with the transition or formalities, please feel free to reach out.
    
    Best regards,
    HR
    XYZ Company`





const Record = ({resignId,lwd,reason,name,id,setAction,status})=>{
    const [showReject,setShowReject] = useState(false);
    const [mailStatus,setMailstatus] = useState('')
    const [rejReason,setRejreason] = useState(name || '' );
    const {load,setLoad} = useContext(context)
    const [updated,setUpdated] = useState({});
    const [stateBtn,setBtn] = useState('')

    
    const handleRejectReasons = async()=>{
        // e.preventDefault()
        // console.log({resignationId:resignId,approved:'false',lwd})
        // setShowReject(false)
        // e.preventDefault()
        try{  
            console.log({resignationId:resignId,approved:'false',lwd})
            let data = await fetch('http://localhost:8080/api/admin/conclude_resignation',{
                method:"PUT",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({resignationId:resignId,approved:stateBtn=='ACC'?'true':'false',lwd})
            });
            let result = await data.json();
            console.log(result)
            // setRejreason({payload:result,)
            setUpdated(result);
            sendMailToEmployee(result)
        }
        catch(err){
            console.log(err)
        }
        // finally{
        //     setShowReject(false)
        // }

    }

    const sendMailToEmployee = async(payload)=>{
        try{
            let data = await fetch('http://localhost:8080/api/admin/sendmail',{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({to:payload.email,subject:'Regarding Resignation',text:stateBtn=='ACC'?acc:rej})
            })
            let res = await data.json();
            console.log(res);
            setMailstatus(res)
            enqueueSnackbar('Mailed to employee',{
                variant:"sucess",
                autoHideDuration:2000,
                anchorOrigin:{
                    horizontal:'center',
                    vertical:'top'
                }
            })
            setLoad(Date.now())
        }
        catch(err){
            enqueueSnackbar(err.message,{
                variant:"error",
                autoHideDuration:2000,
                anchorOrigin:{
                    horizontal:'center',
                    vertical:'top'
                }
            })
        }
    }

    useEffect(()=>{
        if(stateBtn === 'ACC' || stateBtn === 'REJ'){
            handleRejectReasons()
        }
    },[stateBtn])

    return(
    <tr>
        <td>{resignId}</td>
        <td>{reason}</td>
        <td>{lwd} {name}</td>
        <td style={{"display":"flex","justifyContent":"space-around"}}>{status === 'true'?'Resignation Approved':status === 'false'?<h1></h1>:<><button onClick={()=>{
            setBtn('ACC')
            setAction({id,act:'ACCEPT'})}} id="accept" >ACCEPT</button><MdDangerous style={{"marginTop":".5rem"}} size={25} /></>}</td>
        <td>{status==='false'?'Resignation Rejected':status==='true'?<h1></h1>:<button id="reject" onClick={()=>setShowReject(true)}>Reject</button>}</td>
        {showReject?<Reject  handleRejectReasons={handleRejectReasons} setShowReject={setShowReject} setBtn={setBtn} rejReason={rejReason} setRejreason={setRejreason}/>:''}
    </tr>
    )
}
export default Record;