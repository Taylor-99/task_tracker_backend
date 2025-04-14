const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    unique: true, 
    required: true 
    },
  lastName: { 
    type: String, 
    unique: true, 
    required: true 
    },
  email: { 
    type: String, 
    unique: true, 
    required: true 
    },
  password: { 
    type: String, 
    required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);