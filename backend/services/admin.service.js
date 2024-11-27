const ResignInfo = require('../models/resign.model.js');

class adminLogics{
    getResignations(){
        return ResignInfo.find();
    }
}


module.exports = adminLogics
