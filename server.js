const express = require("express")
const bodyParser = require('body-parser')
const path = require('path')
const PORT = 3000
const app = express()
const api = require('./server/routes/api')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/weather');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname,"dist")))
app.use('/', api)
app.listen(process.env.PORT || PORT, function () {
    console.log(`Running server on port ${PORT}`)
})


