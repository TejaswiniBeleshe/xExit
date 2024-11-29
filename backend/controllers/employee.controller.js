const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics()

const registerNewUser = async(req,res)=>{
    try{
        let newUser = await allEmployeeLogics.registerUser(req.body);
        console.log(newUser)
        return res.status(201).send(newUser);
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const loginUser = async(req,res)=>{
    try{
        let user = await allEmployeeLogics.getuserbyname(req.body.username);
        if(!user){
            return res.status(404).send('User not found')
        }
        
        let correctPassword = await allEmployeeLogics.hashPassword(req.body.password,user.password);
        if(!correctPassword){
            return res.status(400).send('Please enter valid password')
        }

        let token = await allEmployeeLogics.createToken(user.id);
        console.log(token)
        res.status(200).send({...user,token})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const newUserResign = async(req,res)=>{
    try{
        let hasResign = await allEmployeeLogics.findResignData(req.user.id);
        if(hasResign){
            return res.status(409).send({message:'Already exist'})
        }
        let data = await allEmployeeLogics.addResignOfEmployee({...req.body,empId:req.user.id});
        // console.log(req.user,data)
        res.status(200).send(data)
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const deleteResign = async(req,res)=>{
    try{
        let hasResign = await allEmployeeLogics.findResignData(req.user.id);
        if(!hasResign){
           return res.status(404).send({message:'not found'})
        }
        res.status(200).send(await allEmployeeLogics.deleteResignData(hasResign.empId))

    }
    catch(err){
        res.status(500).send({message:err.message})

    }
}

const getUserResignation = async(req,res)=>{
    try{
        console.log(req.user.id)
        let userResign = await allEmployeeLogics.findResignData(req.user.id);
        if(!userResign){
            return res.status(404).send({message:'Resignation not found'})
        }
        return res.send(userResign)

    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}



module.exports = {registerNewUser,loginUser,newUserResign,deleteResign,getUserResignation}