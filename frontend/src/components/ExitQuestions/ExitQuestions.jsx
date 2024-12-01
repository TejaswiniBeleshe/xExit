import React, { useState ,useEffect} from "react";
import { createPortal } from "react-dom";
import "./ExitQuestions.css"

const ExitQuestions = ({setShowQuest,setAllQR})=>{
    const [state1,setState1] = useState('');
    const [state2,setState2] = useState('');
    const [state3,setState3] = useState('')


    useEffect(()=>{
        document.body.style.scroll = "none";
        return ()=>{                                   //side effects of previous render cleaned before running the side effect for current render
            document.body.style.scroll = "scroll";
        }
    },[])

    const handleFeedbackSubmit = (e)=>{
        e.preventDefault();
        setAllQR([{questionText:"How was work environment",response:state1},{questionText:"How was work environment",response:state2},{questionText:"Any Suggestion for improvements",response:state3}]);
        setShowQuest(false)
    }

    return createPortal(
        <>
         <div className="modalWrapper" onClick={()=>setShowQuest(false)}></div>
         <div className={`modal-content d-flex flex-column`}>
        <form onSubmit={handleFeedbackSubmit}>
            <label htmlFor="q1">How was work environment</label><br />
            <textarea type="text" id="q1" name="q1" value={state1} onChange={(e)=>setState1(e.target.value)} /><br /><br />
            <label htmlFor="q2">How was work environment</label><br />
            <textarea type="text" id="q2" name="q2" value={state2} onChange={(e)=>setState2(e.target.value)}/><br /><br />
            <label htmlFor="q3">Any Suggestion for improvements</label><br />
            <textarea type="text" id="q3" name="q3" value={state3} onChange={(e)=>setState3(e.target.value)} /><br /><br />
            <button type="submit">Submit</button>
        </form>
        </div>
        </>,document.querySelector(".portal")
    )
}

export default ExitQuestions