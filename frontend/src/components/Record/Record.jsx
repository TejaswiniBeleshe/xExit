import React, { useEffect, useState,useContext } from "react";
import { MdDangerous } from "react-icons/md";
import Reject from "../Reject/Reject";
import "./Record.css"
import { context } from "../../App";
import {enqueueSnackbar} from 'notistack'

function setMsgBasedOnAction(act,d){
const {action,name} = act
let date = new Date(d);
let gday = date.getDay();
let gMon = date.getMonth();
let gYear = date.getFullYear();

if(gMon == 11){
    gYear +=1;
    gMon = 0
}else{
    gMon+=1;
}
date.setDate(gday+1);
date.setMonth(gMon);
date.setFullYear(gYear)

let hrGiven = date.toLocaleDateString("en-GB",{
        day:"2-digit",
        month:"short",
        year:"numeric"
})
const rejNormal = `
Dear Employee,

I hope this email finds you well.

After reviewing your request for ${d} as your Last Working Day (LWD), we regret to inform you that we are unable to accept this date due to business requirements, pending handovers, or project deadlines.
We kindly request you to discuss and agree upon a mutually suitable LWD that ensures smooth transitions and minimal disruption to ongoing tasks. Please let us know your availability to discuss this further.
Thank you for your understanding, and we look forward to resolving this promptly.
Best regards,
HR
XYZ Company
    `
const acc = `
Dear Employee,

I hope this message finds you well.

This email is to formally acknowledge and accept your resignation letter dated ${d}. Your Last Working Day (LWD) has been confirmed as date ${hrGiven}.
We appreciate the contributions you have made during your time with XYZ Company. Please ensure the completion of any pending handovers and clearance formalities before your LWD. The HR team will reach out to you with further details regarding the exit process and final settlement.
If you need any assistance or clarification during this transition period, feel free to contact me or the HR team.
We wish you the very best in your future endeavors and success in all your upcoming opportunities.
Best regards,
HR
XYZ Company`

const rejHolidays = `
Dear Employee,

I hope you're doing well.

Upon reviewing your proposed Last Working Day (LWD) of ${d}, we noticed that it falls on a [weekend/holiday]. As per our company policy, the LWD must be on a regular working day to facilitate proper handover and clearance processes.
We kindly request you to revise your LWD to the nearest working day and inform us of the updated date. This will help ensure a smooth transition and completion of all formalities.
If you have any questions or need assistance, feel free to reach out to me or the HR team.
Best regards,
HR
XYZ Company`

  if(action === 'ACC'){
    return acc;  
  }

  if(action === 'REJ'){
    if(name){
        return rejHolidays;
    }
    return rejNormal;
  }
}



const Record = ({resignId,lwd,reason,name,id,setAction,status})=>{
    const [showReject,setShowReject] = useState(false);
    const [mailStatus,setMailstatus] = useState('')
    const [rejReason,setRejreason] = useState(name || '' );
    const {load,setLoad} = useContext(context)
    const [updated,setUpdated] = useState({});
    const [stateBtn,setBtn] = useState('')

    
    const handleActions = async()=>{
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
            // console.log(result)
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
                body:JSON.stringify({to:payload.email,subject:'Regarding Resignation',text:stateBtn=='ACC'?setMsgBasedOnAction({action:"ACC",name:""},lwd):name?setMsgBasedOnAction({action:"REJ",name},lwd):setMsgBasedOnAction({action:"REJ",name:""},lwd)})
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
            handleActions()
        }
    },[stateBtn])

    return(
    <tr>
        <td>{resignId}</td>
        <td>{reason}</td>
        <td>{lwd} {name}</td>
        <td style={{"display":"flex","justifyContent":"space-around"}}>{status === 'true'?'Resignation Approved':status === 'false'?<h1></h1>:<><button onClick={()=>{
            setBtn('ACC')
            setAction({id,act:'ACCEPT'})}} id="accept" >ACCEPT</button></>}</td>
        <td>{status==='false'?'Resignation Rejected':status==='true'?<h1></h1>:<button id="reject" onClick={()=>setShowReject(true)}>Reject</button>}</td>
        {showReject?<Reject  handleActions={handleActions} setShowReject={setShowReject} setBtn={setBtn} rejReason={rejReason} setRejreason={setRejreason}/>:''}
    </tr>
    )
}
export default Record;