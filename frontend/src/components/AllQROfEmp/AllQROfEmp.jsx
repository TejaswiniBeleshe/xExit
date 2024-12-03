import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllQROfEmp.css"

const EachQR = ({ele})=>{
    const {employeeId,responses} = ele
    return(
        <div className="each-qr">
            <h4>{employeeId}</h4>
            {
                responses.map((qr)=><p>{qr.questionText}:{qr.response}</p>)
            }
        </div>
    )
}

const AllQROfEmp = ()=>{

    const [allQROfUser,setAllQROfUser] = useState('');

    const getAll = async()=>{
        try{
            let data = await fetch('http://localhost:8080/api/admin/exit_responses',{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                },
                
            });
            let res = await data.json();
            console.log(res)
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
            <Link to='/admin'><button >Dashboard</button></Link>
            <div className="qr-cards">
            {
                allQROfUser?allQROfUser.map((ele)=>{
                   return <EachQR ele={ele}/>
                }):''
            }
            
        </div>
        </>
    )
}
export default AllQROfEmp

