 const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
const worksController = require('../controllers/worksController');
const authVerify = require('../middleware/authVerify');

router.post('/create-student', studentController.createStudent)
router.get('/login-student', studentController.studentLogin)
router.get('/read-student', authVerify, studentController.readStudent)
router.post('/update-student', authVerify, studentController.updateStudent)
router.get('/delete-student', authVerify, studentController.deleteStudent)

// Recover pass
router.post('/send-otp', studentController.sendOTP)
router.get('/verify-otp', studentController.verifyOTP)
router.post('/reset-pass', studentController.resetPass)

//Works
router.post('/create-work', authVerify, worksController.createWork)
router.get('/read-work', authVerify, worksController.readWork)
router.post('/update-work/:id', authVerify, worksController.updateWork)
router.get('/delete-work/:id', authVerify, worksController.deleteWork)


module.exports = router; 