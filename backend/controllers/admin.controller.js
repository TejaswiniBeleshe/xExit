const  adminLogics = require('../services/admin.service');
const allAdminLogics = new adminLogics();

const getAllResignations = async(req,res)=>{
    try{
        let allUsersResigns = await allAdminLogics.getResignations();
        res.send(allUsersResigns)
    }
    catch(err){
        return res.status(500).send({message:err})
    }
}

module.exports = {getAllResignations}