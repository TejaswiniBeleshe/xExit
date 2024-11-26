const Employee = require('../models/employee.model');
const bcrypt = require('bcrypt');
const jwttoken = require('jsonwebtoken');

class employeeLogics{
    registerUser=async(payload)=>{
        console.log(await this.hashPassword(payload.password))
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
}

module.exports = employeeLogics