// dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// create the app & set it to parse JSON
const app = express()
app.use(bodyParser.json())

// use dotenv if in not in production mode
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// enable CORS BEFORE the controller declaration and mongoose connection 
//cors- cross origin resource sharing 
//this enables localhost/4200 to communicate to localhost/3000 which are both diffrent website. Same Origin Policy
const cors = require('cors')
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
}))


// db conn
mongoose.connect(process.env.DATABASE_URL, {
}).then((res) => {
    console.log('Connected')
}).catch((err) => {
    console.log(`Connection Error: ${err}`)
})

// map url path to controller
const employees = require('./controllers/employees')
app.use('/api/employees', employees)

// // set the static path to the public folder; direct all http requests to index.html
// app.use(express.static(__dirname + '/public'))
// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })

// start express web server & make public
// make port dynamic in case host already uses 3000
const port = process.env.PORT || 3000
app.listen(port)

module.exports = app
