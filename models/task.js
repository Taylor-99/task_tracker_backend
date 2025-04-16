const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { 
    type: String, 
    unique: true, 
    required: true 
    },
  dueDate: { 
    type: Date, 
    unique: true, 
    required: true 
    },
  createdDate: { 
    type: Date, 
    unique: true, 
    required: true 
    },
  category: { 
    type: String,
    },
  notes: { 
    type: String,
    },
  user: { 
    type: mongoose.Types.ObjectId, 
    ref: 'User'
    },
    

}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);