import React, { useEffect, useState,useContext } from 'react';
import './Admin.css'
import Record from '../Record/Record';
import { useNavigate ,Link} from 'react-router-dom';
import { context } from "../../App";
import { config } from '../../App';
const Admin = ()=>{
    const [allResigns,setAllResigns] = useState('');
    const navigate = useNavigate();
    const [arrUser,setArrayUser] = useState([]);
    const [allHolidays,setAllHolidays] = useState([])
    const {load,setLoad} = useContext(context);
    const [action,setAction] = useState('')
    
    const getAllUser = async()=>{
        try{
            let token = localStorage.getItem('token')
            let data = await fetch(`${config.endpoint}/admin/resignations`,{
                method:'GET',
                headers:{
                    authorization:`Bearer ${token}`
                }
            });
            let res = await data.json();
            // console.log(res);
            setAllResigns(res)
            // let arr = res.map((ele)=>{
            //     return 

            // })
        }
        catch(err){
            console.log(err)
        }
    }

    const handleLogOut = ()=>{
        localStorage.removeItem('token');
        // localStorage.removeItem('userinfo')
        navigate('/')
        window.history.pushState(null, '', window.location.href);
                    window.onpopstate = function () {
                      window.history.go(1);  // Prevent back navigation
                    };

    }

    const getAllHolidays = async()=>{
        try{
            let respo = await fetch('https://calendarific.com/api/v2/holidays?api_key=rsfPUxoCnaV2TTgKKR8P7rjP0egK1X2w&country=IN&year=2024');
            let data = await respo.json();
            // setAllHolidays(data.response.holidays)
            let arr = data.response.holidays.map((ele)=>{
                return {date:ele.date.iso,name:ele.name}
            });
            // console.log(arr)
            setAllHolidays(arr)
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getAllHolidays()
    },[])

    useEffect(()=>{
        getAllUser()
    },[load])
    return(
        <>
        <div>
            <h1 className='ad-heading'>ADMIN DASHBOARD</h1>
            <br />    
        <button className='ad-btn' onClick={handleLogOut} >LogOut</button>
        <Link to='/questionnair'><button className='v-btn'>View Questionnaira</button></Link>
        </div>
        {allResigns && allResigns.length>0?<table>
            <thead>
            <tr>
                <th>Resignation Id</th>
                <th>Reason</th>
                <th>lwd</th>
                <th>ACCEPT</th>
                <th>REJECT</th>
            </tr>
            </thead>
            <tbody>
        {allResigns?allResigns.map((ele)=>{ 
            let r=''
            let result = allHolidays.some(holidays=>{
                r = holidays.name
                return holidays.date === ele.lwd;
            });
            if(result){
                return <Record key={ele._id} lwd={ele.lwd} reason={ele.reason} emp={ele.empId} name={r} status={ele.status}/>
            }else{
                let days = ['SUN','MON','TUE','WED','THUR','FRI','SAT']
                let date = new Date(ele.lwd);
                let day = date.getDay()
                if(days[day] == 'SAT' || days[day] == 'SUN'){
                    return <Record key={ele._id} lwd={ele.lwd} reason={ele.reason} resignId={ele._id} name="lwd falls on WEEK END" id={ele.id} status={ele.status} />
                }
                return <Record key={ele._id} lwd={ele.lwd} reason={ele.reason} resignId={ele._id} name='' id={ele.id} status={ele.status}/>
            }
            
        }):''}
        </tbody>
        </table>:<p>The employee has not submitted their resignation yet. Please follow up with them if needed.</p>}
        </>

    )
}

export default Admin