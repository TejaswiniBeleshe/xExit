const {validateRegisterUser,validateLoginUser} = require('../validators/user.validator.js');

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
    try{
       let {error} = validateLoginUser.validate(req.body);
       if(error){
        return res.status(400).send({message:error.details[0].message})
       }
       next()
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
}



module.exports = {validateRegInfo,validateLogInfo}