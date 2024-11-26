import React, { useState } from 'react';
import Resignation from '../Resignation/Resignation.jsx';
import {enqueueSnackbar} from 'notistack'
const Employee = ()=>{
    const [showRform,setShowRform] = useState(false);
    const handleDelete = async()=>{
        try{
            let data = await fetch('http://localhost:8082/api/user/resign',{
                method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            // let res = await data.json();
            if(data.status === 204){
                enqueueSnackbar('Removed',{
                    variant:'success',
                    autoHideDuration:3000,
                    anchorOrigin:{
                        vertical:'top',
                        horizontal:'center'
                    }
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div>
            Employee
            
            <button onClick={(e)=>setShowRform(true)}>Resign</button><br />
            <button onClick={handleDelete}>Delete</button>
            {showRform?<Resignation setShowRform={setShowRform}/>:''}
        </div>
    )
}

export default Employee;