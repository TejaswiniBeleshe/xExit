const router = require('express').Router();
const {validateRegInfo,validateLogInfo,validateResignInfo,auth} = require('../middwares/employee.middware.js')
const {registerNewUser,loginUser,newUserResign,deleteResign,getUserResignation,postUserResponse,getUserResponse} = require('../controllers/employee.controller.js')



router.post('/auth/register',validateRegInfo,registerNewUser)
router.post('/auth/login',validateLogInfo,loginUser)
router.post('/user/resign',[auth,validateResignInfo],newUserResign)
router.delete('/user/resign',auth,deleteResign);
router.get('/user/resignation',auth,getUserResignation)
router.post('/user/responses',auth,postUserResponse);
router.get('/user/responses',auth,getUserResponse)

module.exports = router