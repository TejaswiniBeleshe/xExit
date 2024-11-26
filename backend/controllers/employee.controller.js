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

module.exports = {registerNewUser,loginUser}