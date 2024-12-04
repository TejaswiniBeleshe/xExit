import React from "react";

const QRCard = ({questionText,response,i})=>{
    return(
        <>
          <h5>{i+1} {questionText}</h5>
          <p>{response}</p>
        </>
    )
}

export default QRCard