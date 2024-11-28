import React, { useEffect, useState,useContext } from "react";
import { MdDangerous } from "react-icons/md";
import Reject from "../Reject/Reject";
import "./Record.css"
import { context } from "../../App";
import {enqueueSnackbar} from 'notistack'

const rej = `
Dear,
Thank you for submitting your resignation. However, due to critical business needs or contractual obligations, we are unable to accept it at this time.
We value your contributions and would like to discuss this further to find a suitable resolution. Please let me know a convenient time to connect.

Best regards,
HR 
xyz company
`
const acc = `
Dear,
Thank you for submitting your resignation. We accept your decision to leave Company.
We appreciate your contributions during your time with us and wish you the best in your future endeavors. Please complete any pending tasks and handover formalities before your departure.

Best regards, 
HR
xyz company`

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
            let data = await fetch('http://localhost:8082/api/admin/conclude_resignation',{
                method:"PUT",
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({resignationId:resignId,approved:setBtn=='ACC'?'true':'false',lwd})
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
            let data = await fetch('http://localhost:8082/api/admin/sendmail',{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({to:payload.email,subject:'Regarding Resignation',text:stateBtn=='ACC'?acc:rej+rejReason})
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
        <td style={{"display":"flex","justifyContent":"space-around"}}><button onClick={()=>{
            setBtn('ACC')
            setAction({id,act:'ACCEPT'})
        }} id="accept" >ACCEPT</button><MdDangerous style={{"marginTop":".5rem"}} size={25} /></td>
        <td><button id="reject" onClick={()=>{
            setShowReject(true)
        }}>Reject</button></td>
        {showReject?<Reject  handleRejectReasons={handleRejectReasons} setShowReject={setShowReject} setBtn={setBtn} rejReason={rejReason} setRejreason={setRejreason}/>:''}
    </tr>
    )
}
export default Record;