

const mongoose = require('mongoose');
const Employee = require('./employee.model');
const { required } = require('joi');

const questionaria = new mongoose.Schema({
    'questionText':{
        type:String,
        required:true
    },
    'response':{
        type:String,
        required:true
    }
})


const userResponse = new mongoose.Schema({
    'employeeId':{
        type:String,
        required:true
    },
    'responses':{
        type:[questionaria],
        default:[]
    }
})

const UserResponse = mongoose.model('UserResponse',userResponse);

module.exports = UserResponse;