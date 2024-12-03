const mongoose = require('mongoose');

const addminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Admin = mongoose.model('Admin',addminSchema);

module.exports = Admin;