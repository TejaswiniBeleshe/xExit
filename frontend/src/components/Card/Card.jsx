import React, { useEffect, useState } from 'react';



const Card = ({state,setState})=>{
    
    useEffect(()=>{
        let data = JSON.parse(localStorage.getItem('userinfo'));
        setState(data)
    },[])
    return(
        <div className='card'>
            <h4>{state.lwd}</h4>
            <p>{state.reason}</p>

        </div>
    )
}
export default Card;