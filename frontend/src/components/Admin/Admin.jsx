import React, { useEffect, useState,useContext } from 'react';
import './Admin.css'
import Record from '../Record/Record';
import { useNavigate } from 'react-router-dom';
import { context } from "../../App";
const Admin = ()=>{
    const [allResigns,setAllResigns] = useState('');
    const navigate = useNavigate();
    const [arrUser,setArrayUser] = useState([]);
    const [allHolidays,setAllHolidays] = useState([])
    const {load,setLoad} = useContext(context)
    
    const getAllUser = async()=>{
        try{
            let token = localStorage.getItem('token')
            let data = await fetch('http://localhost:8082/api/admin/resignations',{
                method:'GET',
                headers:{
                    authorization:`Bearer ${token}`
                }
            });
            let res = await data.json();
            console.log(res);
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
        localStorage.removeItem('userinfo')
        navigate('/')

    }

    const getAllHolidays = async()=>{
        try{
            let respo = await fetch('https://calendarific.com/api/v2/holidays?api_key=fN6GV5K06HZOPBHu3Hu1IuVmCsrZs7L1&country=IN&year=2024');
            let data = await respo.json();
            // setAllHolidays(data.response.holidays)
            let arr = data.response.holidays.map((ele)=>{
                return {date:ele.date.iso,name:ele.name}
            });
            console.log(arr)
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
        getAllUser
    })
    return(
        <>
        <div>
            <h1 className='ad-heading'>ADMIN DASHBOARD</h1>
            <br />
        <button className='ad-btn' onClick={handleLogOut} >LogOut</button>
        </div>
        {allResigns?<table>
            <tr>
                <th>Emp Id</th>
                <th>lwd</th>
                <th>Reason</th>
                <th>ACCEPT</th>
                <th>REJECT</th>
            </tr>
        {allResigns?allResigns.map((ele)=>{ 
            let r=''
            let result = allHolidays.some(holidays=>{
                r = holidays.name
                return holidays.date === ele.lwd;
            });
            if(result){
                return <Record lwd={ele.lwd} reason={ele.reason} emp={ele.empId} name={r}/>
            }else{
                let days = ['SUN','MON','TUE','WED','THUR','FRI','SAT']
                let date = new Date(ele.lwd);
                let day = date.getDay()
                if(days[day] == 'SAT' || days[day] == 'SUN'){
                    return <Record lwd={ele.lwd} reason={ele.reason} emp={ele.empId} name="WEEK END"/>
                }
                return <Record lwd={ele.lwd} reason={ele.reason} emp={ele.empId} name=''/>
            }
            
        }):''}
        </table>:<p>NOBODY WANTS TO LEAVE COMPANY YET</p>}
        </>

    )
}

export default Admin