const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();


const registerNewUser = async(req,res)=>{
    // console.log(req.body)
    try{
        let userExist = await allEmployeeLogics.getEmployeeByMail(req.body.email);
        if(userExist){
            return res.status(409).send({message:"user exit"})
        }
        let newUser = await allEmployeeLogics.registerUser(req.body);
        // console.log(newUser);
         let token = await allEmployeeLogics.createToken(newUser.id);
        //  console.log(token)
        return res.status(201).send({...newUser,token});
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const loginUser = async(req,res)=>{
    try{
        let user = await allEmployeeLogics.getEmployeeByMail(req.body.email);
        let token = await allEmployeeLogics.createToken(user.id);
        // console.log(token)
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

const postUserResponse = async(req,res)=>{
    console.log(req.body)
    try{
        console.log('user',req.user.id)
        let data = await allEmployeeLogics.addUserResponse(req.body,req.user.id);
        return res.status(200).send(data)

    }
    catch(err){
        console.log(err)
        return res.status(500).send({message:"Internal server error"})
    }
}

const getUserResponse = async(req,res)=>{
    try{
        let data = await allEmployeeLogics.findUserResponse(req.user._id);
        if(!data){
            return res.status(404).send({message:'Response not found,Please add respones'})
        }
        return res.send(data)

    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}

module.exports = {registerNewUser,loginUser,newUserResign,deleteResign,getUserResignation,postUserResponse,getUserResponse}