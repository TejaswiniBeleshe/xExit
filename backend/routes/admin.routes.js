const router = require('express').Router();
const {auth} = require('../middwares/employee.middware.js');
const {getAllResignations} = require('../controllers/admin.controller.js')

router.get('/admin/resignations',auth,getAllResignations)



module.exports = router