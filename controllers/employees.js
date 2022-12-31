const express = require('express')
const router = express.Router()

// import Employee model
const Employee = require('../models/employee')

// GET: /api/employees => return all employee data as json
router.get('/', (req, res) => {
    Employee.find((err, employees) => {
        if (err) {
            return res.json(err).status(404)
        }
        else {
            return res.json(employees).status(200)
        }
    }).sort('name')
})

// POST: /api/employees => create a new empployer
router.post('/', (req,res)=>{
    Employee.create(req.body, (err, employees)=>{
        if (err) {
            return res.json(err).status(404)
        }
        else {
            return res.json(employees).status(201)
        }
    })
})

// DELETE: /api/employees/abc123 => delete selected employee
router.delete('/:_id', (req, res) => {
    Employee.deleteOne({ _id: req.params._id }, (err, deleteResponse) => {
        if (err) {
            return res.json(err).status(400)
        }
        else {
            res.json(deleteResponse).status(200)
        }
    })
})

// PUT: /api/employees/abc123 => updated seleted employee
router.put('/:_id', (req, res) => {
    Employee.findOneAndUpdate({ _id: req.params._id }, req.body, (err, employees) => {
        if (err) {
            return res.json(err).status(400)
        }
        else {
            res.json(employees).status(202)
        }
    })    
})

module.exports = router