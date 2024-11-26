const router = require('express').Router();
const {validateRegInfo,validateLogInfo} = require('../middwares/employee.middware.js')
const {registerNewUser,loginUser} = require('../controllers/employee.controller.js')



router.post('/auth/register',validateRegInfo,registerNewUser)
router.post('/auth/login',validateLogInfo,loginUser)


module.exports = router