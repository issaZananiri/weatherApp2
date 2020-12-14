const express = require("express")
const router = express.Router()
const request = require('request')
const City = require('./../model/City')
router.get('/city/:cityName', function (req, res) {
    const city = req.params.cityName
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7bf665b828fdfc577cc7819ba13ac560`, function (err, response) {
        const dataParsed = JSON.parse(response.body)
        console.log("getting city info")
    if (dataParsed.cod === "404") {
            res.send(err)
        } else {
            let filteredData = {
                name: dataParsed.name,
                temperature: dataParsed.main.temp,
                condition: dataParsed.weather[0].description,
                conditionPic: dataParsed.weather[0].icon,
            }
            console.log(filteredData)

      
            res.send(filteredData)

        }
    }
    )
})
router.get('/cities', async function (req, res) {
    const data = await City.find({})
    res.send(data)
})

router.post('/city', async function (req, res) {
    let body = req.body
    const newCity = new City(body)
    await newCity.save()
    res.end()
})

router.delete('/city/:cityName', async function (req, res) {
    const cityName = req.params.cityName
    await City.findOneAndDelete({
        name: cityName
    })
    res.end()
})

module.exports = router

