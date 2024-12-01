import React from "react";

const QRCard = ({questionText,response})=>{
    return(
        <>
          <h5>{questionText}</h5>
          <p>{response}</p>
        </>
    )
}

export default QRCard