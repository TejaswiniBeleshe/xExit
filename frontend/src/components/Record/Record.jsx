import React, { useState } from "react";
import { MdDangerous } from "react-icons/md";
import Reject from "../Reject/Reject";


const Record = ({emp,lwd,reason,name})=>{
    const [showReject,setShowReject] = useState(false)
    return(
    <tr>
         <td>{emp}</td>
        <td>{reason}</td>
        <td>{lwd} {name}</td>
        <td style={{"display":"flex","justifyContent":"space-around"}}><button>ACCEPT</button><MdDangerous /></td>
        <td><button>Reject</button></td>
        {showReject?<Reject/>:''}
    </tr>
    )
}
export default Record;