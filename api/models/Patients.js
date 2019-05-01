const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  consulted_by: { type: String, required: false },
  complaints: { type: String, required: true },
  results: { type: String, required: false },
  drugs: { type: String, required: false },
  is_deleted: {type: Boolean, required: false},
  created: { type: String, required: true },
  modified: { type: String, required: true }
});
/*
const DoctorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },  
  created: { type: String, required: true },
  modified: { type: String, required: true }
});
*/

module.exports = mongoose.model('Patients', PatientSchema);
//module.exports = mongoose.model('Doctors', DoctorSchema);