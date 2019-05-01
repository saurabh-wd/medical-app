const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DurgsSchema = new Schema({
    patient_id: {type: Number, required: true},
    drug_name: { type: String, required: true },
    times: { type: Number, required: true },
    method: { type: String, required: true }
});

module.exports = mongoose.model('Drugs', DurgsSchema);
