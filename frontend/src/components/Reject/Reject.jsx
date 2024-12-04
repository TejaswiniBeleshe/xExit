import React,{useContext, useEffect, useState} from "react";
import { createPortal } from "react-dom";
import "./Reject.css"
import { context } from "../../App";
import {enqueueSnackbar} from 'notistack'


const Reject = ({setShowReject,setBtn,rejReason,setRejreason,handleActions})=>{
    // const [rejReason,setRejreason] = useState(name || '' );
    // const {load,setLoad} = useContext(context)
    // const [updated,setUpdated] = useState({})

    useEffect(()=>{
        document.body.style.scroll = "none";
        return ()=>{                                   //side effects of previous render cleaned before running the side effect for current render
            document.body.style.scroll = "scroll";
        }
    },[])

    // const handleRejectReasons = async(e)=>{
    //     e.preventDefault()
    //     // console.log({resignationId:resignId,approved:'false',lwd})
    //     // setShowReject(false)
    //     // e.preventDefault()
    //     try{  
    //         console.log({resignationId:resignId,approved:'false',lwd})
    //         let data = await fetch('http://localhost:8082/api/admin/conclude_resignation',{
    //             method:"PUT",
    //             headers:{
    //                 'Authorization':`Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify({resignationId:resignId,approved:'false',lwd})
    //         });
    //         let result = await data.json();
    //         console.log(result)
    //         // setRejreason({payload:result,)
    //         setUpdated(result);
    //         sendMailToEmployee(result)
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    //     finally{
    //         setShowReject(false)
    //     }

    // }

    // const sendMailToEmployee = async(payload)=>{
    //     try{
    //         let data = await fetch('http://localhost:8082/api/admin/sendmail',{
    //             method:'POST',
    //             headers:{
    //                 Authorization:`Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify({to:payload.email,subject:'Regarding Resignation',text:rejReason || str})
    //         })
    //         let res = await data.json();
    //         console.log(res);
    //         setMailstatus(res)
    //         enqueueSnackbar('Mailed to employee',{
    //             variant:"sucess",
    //             autoHideDuration:2000,
    //             anchorOrigin:{
    //                 horizontal:'center',
    //                 vertical:'top'
    //             }
    //         })
    //         setLoad(Date.now())
    //     }
    //     catch(err){
    //         enqueueSnackbar(err.message,{
    //             variant:"error",
    //             autoHideDuration:2000,
    //             anchorOrigin:{
    //                 horizontal:'center',
    //                 vertical:'top'
    //             }
    //         })
    //     }
    // }

    // useEffect(()=>{
    //     console.log('kjhgvf')
    //    if(updated.email){
    //     sendMailToEmployee(updated)
    //     console.log('exexuted')
    //    }
    // },[showReject])
    const handleSetBtn = ()=>{
        handleActions();
        setShowReject(false)
    }
    return createPortal(
        <>
        <div className="modalWrapper" onClick={()=>setShowReject(false)}></div>
            <div className={`modal-content d-flex flex-column`}>
                <h1>Resign Form</h1>  
                <form onSubmit={handleSetBtn}>
                    <label htmlFor="rej-reason">Reason for reject</label><br />
                    <textarea type="text" name="rej-reason" id="rej-reason" value={rejReason} onChange={(e)=>setRejreason(e.target.value)}/><br/>
                    <button type="submit" id="send">SEND</button>
                </form> 
            </div>
        </>,document.querySelector(".portal")
    )     
}

export default Reject