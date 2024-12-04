import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllQROfEmp.css";
import { config } from "../../App";

const EachQR = ({ele})=>{
    const {employeeId,responses} = ele
    return(
        <div className="each-qr" style={{"textAlign":"start"}}>
            <h4>EmployeeId: {employeeId}</h4>
            {
                responses.map((qr,i)=><p><h4>{i+1} {qr.questionText}</h4><span>{qr.response}</span></p>)
            }
        </div>
    )
}

const AllQROfEmp = ()=>{

    const [allQROfUser,setAllQROfUser] = useState('');

    const getAll = async()=>{
        try{
            let data = await fetch(`${config.endpoint}/admin/exit_responses`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                },
                
            });
            let res = await data.json();
            // console.log(res)
            setAllQROfUser(res)
        }
        catch(err){
            console.log(err.message)

        }
    }
    useEffect(()=>{
        getAll()

    },[])
    return(
        <>
            <Link to='/admin'><button id="d-board">Dashboard</button></Link>
           
            <div className="qr-cards">
            {allQROfUser && allQROfUser.length > 0?"":<p>The employee has not responded to the questionnaire yet. Please follow up with them to complete it.</p>}
            {
                allQROfUser?allQROfUser.map((ele,i)=>{
                   return <EachQR ele={ele} />
                }):''
            }
            
        </div>
        </>
    )
}
export default AllQROfEmp

