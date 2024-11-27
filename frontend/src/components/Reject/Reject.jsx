import React,{useContext, useEffect, useState} from "react";
import { createPortal } from "react-dom";
import "./Reject.css"

const Reject = ()=>{
    return createPortal(
        <>
        <div className="modalWrapper" onClick={()=>setShowRform(false)}></div>
            <div className={`modal-content d-flex flex-column`}>
                <h1>Resign Form</h1>  
                <form onSubmit={handleResignForm}>
                    <label htmlFor="rdate">Last working Day</label><br />
                    <input type="date" id="rdate" name="rdate" value={rDate} onChange={(e)=>setRdate(e.target.value)}/><br /><br />
                    <label htmlFor="rreason">Reason</label>
                    <textarea type="text" name="rreason" id="reason" value={rReason} onChange={(e)=>setRreason(e.target.value)}/>
                    <button type="submit" >close</button>
                </form>
               
            </div>
        </>,document.querySelector(".portal")
    )
}

export default Reject