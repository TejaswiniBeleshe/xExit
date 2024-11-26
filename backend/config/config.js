const mongoose = require('mongoose');

const connectMongoDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('connected with mongodb')
    }
    catch(err){
        console.log(`Not able coonect with MongoDB`)
    }
}

module.exports = connectMongoDB