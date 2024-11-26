import React from 'react';
import './Admin.css'
const Admin = ()=>{
    return(
        <>
        <div>
            ADMIN
        </div>
        <table>
            <tr>
                <th>username</th>
                <th>lwd</th>
                <th>ACCEPT</th>
                <th>REJECT</th>
            </tr>
            <tr>
                <td>Tejasiwni</td>
                <td>23-02-2021</td>
                <td><button>ACCEPT</button></td>
                <td><button>Reject</button></td>
            </tr>
            
        </table>
        </>

    )
}

export default Admin