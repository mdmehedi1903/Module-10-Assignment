const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: { type: String},
  otp: { type: String},
  status: { type: String, default: 0},
},
    {
        versionKey: false,
        timestamps: true
    }
);

const OTPModel = mongoose.model('OTP', otpSchema);

module.exports = OTPModel;
