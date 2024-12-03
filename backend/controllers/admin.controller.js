const  adminLogics = require('../services/admin.service');
const allAdminLogics = new adminLogics();
const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();
const nodemailer = require('nodemailer')



const getAllResignations = async(req,res)=>{
    try{
        let allUsersResigns = await allAdminLogics.getResignations();
        res.send(allUsersResigns)
    }
    catch(err){
        return res.status(500).send({message:err})
    }
}

const updateStatusOfResignation = async(req,res)=>{
    try{ 
        let data = await allEmployeeLogics.modifyResignation(req.body);
        console.log(data,'update')
        if(!data){
            return res.status(404).send({message:'no id found'})
        }
        let getuser = await allEmployeeLogics.findUserById(data.empId);
        return res.status(200).send({...data,email:getuser.email})

    }
    catch(err){
        return res.status(500).send({message:err.message})

    }
}

const sendMail = async(req,res)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // service:'gmail',
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.HR_EMAIL,
          pass: process.env.HR_EMAIL_PASSWORD,
        },
    });

    let {to,subject,text,html} = req.body;
    // if(!to || !subject || !text ){
    //     return res.status(404).send({message:'Missing requirements'})
    // }
    try{
        const info = await transporter.sendMail({
            from:process.env.HR_EMAIL,
            to,subject,text,html
        })
        console.log(info)
        return res.status(200).send(info)
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:'failed to send email'})
    }
}

const ViewAllUserResponse = async(req,res)=>{
    try{
        let data = await allAdminLogics.getResponses();
        if(!data){
            return res.status(404).send({message:'No responses have found'})
        }
        console.log(data)
        return res.send(data)

    }
    catch(err){
        return res.status(500).send({message:err.message})

    }
}
module.exports = {getAllResignations,updateStatusOfResignation,sendMail,ViewAllUserResponse}