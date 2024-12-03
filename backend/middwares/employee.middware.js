const {validateRegisterUser,validateLoginUser, validateResignData} = require('../validators/user.validator.js');
const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();

const validateRegInfo = async(req,res,next)=>{
    try{
       let {error} = validateRegisterUser.validate(req.body);
       if(error){
        return res.status(400).send({message:error.details[0].message})
       }
       next()
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const validateLogInfo = async(req,res,next)=>{
    console.log(req.body)
    try{
        let {error} = validateLoginUser.validate(req.body);
        console.log(error)
        if(error){
         return res.status(400).send({message:error.details[0].message})
        }
        let userExist = await allEmployeeLogics.getEmployeeByMail(req.body.email);
        if(!userExist){
         return res.status(404).send({message:"user not found"})
 
        }
        let correctpassword = await allEmployeeLogics.validatePassword(req.body.password,userExist.password);
        console.log(correctpassword)
        if(!correctpassword){
         return res.status(401).send({message:"invalid credentials"})
        }
        next()
     }
     catch(err){
         res.status(500).send({message:err.message})
     }
}

const validateResignInfo = async(req,res,next)=>{
    // console.log('validate')
    // let {lwd,reason} = req.body;
    // console.log(lwd,reason)
    try{
       let {error} = validateResignData.validate({empId:req.user.id,...req.body});
       if(error){
        return res.status(400).send({message:error.details[0].message})
       }
       console.log('done')
       next();
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}

const auth = async(req,res,next)=>{
    // console.log('auth')
    const token = req.headers.authorization.split(' ')[1]
    try{
        let user = await allEmployeeLogics.compareToken(token);
        // console.log(user,token)
        if(!user){
            return res.status(401).send({message:'Unauthorized'})
        }
        req.user = await allEmployeeLogics.findUserById(user);
        // console.log(req.user)
        next()
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}


module.exports = {validateRegInfo,validateLogInfo,validateResignInfo,auth}