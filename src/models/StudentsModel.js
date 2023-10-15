const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true},
  firstName: { type: String},
  lastName: { type: String},
  mobile: { type: String },
  password: { type: String},
  address: { type: String},
  roll: { type: String },
  class: { type: String }
},
{
    versionKey: false,
    timestamps: true
}
);

const StudentsModel = mongoose.model('Student', studentSchema);

module.exports = StudentsModel;
