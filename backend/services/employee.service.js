const Employee = require('../models/employee.model');
const ResignInfo = require('../models/resign.model');
const UserResponse = require('../models/emprespo.model')
const bcrypt = require('bcrypt');
const jwttoken = require('jsonwebtoken');

class employeeLogics{
    registerUser=async(payload)=>{
        // console.log(await this.hashPassword(payload.password))
        return Employee.create({...payload,password:await this.hashPassword(payload.password)});
    }
    hashPassword(password){
        return bcrypt.hash(password,10)
    }
    validatePassword(text,password){
        return bcrypt.compare(text,password)
    }
    getuserbyname(name){
        return Employee.findOne({username:name})
    }
    createToken(payload){
        return jwttoken.sign(payload,process.env.SECREATE_KEY)
    }

    compareToken(token){
        return jwttoken.verify(token,process.env.SECREATE_KEY)
    }

    addResignOfEmployee(payload){
        return ResignInfo.create(payload)
    }

    findUserById(id){
        return Employee.findById(id)
    }
    findResignData(id){
        return ResignInfo.findOne({empId:id})
    }

    deleteResignData(id){
        return ResignInfo.findOneAndDelete({empId:id})
    }

    modifyResignation(payload){
        console.log(payload)
        return ResignInfo.findOneAndUpdate({_id:payload.resignationId},{$set:{status:payload.approved}},{new:true})
    }

    addUserResponse=async(payload,Id)=>{
        console.log(payload,Id)
        let userRespo = await UserResponse.findOne({employeeId:Id});
        console.log(userRespo)
        if(!userRespo){
            // let data = {'employeeId':Id,responses:[payload]}
            return await UserResponse.create({employeeId:Id,responses:[...payload]})
        }
        // return await UserResponse.findOneAndUpdate({employeeId:Id},{$push:{responses:payload}},{new:true})
    }
    findUserResponse(userId){
        return UserResponse.findOne({employeeId:userId})
    }
    getEmployeeByUsername(username){
        return Employee.findOne({username})
    }
    getEmployeeByMail(email){
        return Employee.findOne({email})
    }
}
module.exports = employeeLogics