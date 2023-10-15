 const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');
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



module.exports = router;