const ResignInfo = require('../models/resign.model.js');
const UserResponse = require('../models/emprespo.model.js')
class adminLogics{
    getResignations(){
        return ResignInfo.find();
    }
    getResponses(){
        return UserResponse.find({})
    }
}

module.exports = adminLogics
