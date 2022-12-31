// import mongoose
const mongoose = require('mongoose')

// define schema for a customer
var employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    department: {
        type: String,
        required: 'department is required'
    },
    status: {
        type: String,
        required: 'status is required'
    },
    email: {
        type: String,
        required: 'email is required'
    }
})

// make public 
module.exports = mongoose.model('Employee', employeeSchema)