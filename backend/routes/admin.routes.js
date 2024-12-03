const router = require('express').Router();
const {auth} = require('../middwares/employee.middware.js');
const {getAllResignations,updateStatusOfResignation, sendMail,ViewAllUserResponse} = require('../controllers/admin.controller.js');


router.get('/admin/resignations',auth,getAllResignations)
router.put('/admin/conclude_resignation',auth,updateStatusOfResignation)
router.post('/admin/sendmail',auth,sendMail)
router.get('/admin/exit_responses',auth,ViewAllUserResponse)

module.exports = router