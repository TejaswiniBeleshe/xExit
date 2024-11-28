const router = require('express').Router();
const {auth} = require('../middwares/employee.middware.js');
const {getAllResignations,updateStatusOfResignation, sendMail} = require('../controllers/admin.controller.js');


router.get('/admin/resignations',auth,getAllResignations)
router.put('/admin/conclude_resignation',auth,updateStatusOfResignation)
router.post('/admin/sendmail',auth,sendMail)

module.exports = router