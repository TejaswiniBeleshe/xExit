import React, { useEffect, useState } from 'react';



const Card = ({userResign})=>{
    
    // useEffect(()=>{
    //     let data = JSON.parse(localStorage.getItem('userinfo'));
    //     setState(data)
    // },[])
    return(
        <div className='card'>
            <h4>{userResign.lwd}</h4>
            <p>{userResign.reason}</p>
        </div>
    )
}
export default Card;