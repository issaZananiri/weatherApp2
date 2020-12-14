class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let cities = await $.get('/cities')
        this.cityData = cities
    }

    async getCityData(cityName) {
            const data = await $.get(`/city/${cityName}`)
            if (!data.name) {
                alert("You've entered an invalid city name")
                return
            }
            this.cityData.push(data)
            
        }
    

    async saveCity(cityName) {
        const city = this.cityData.find(c => c.name === cityName)
        await $.post('/city', city)


    }

    removeCity(cityName) {
        const cityIndex = this.cityData.findIndex(c => c.name === cityName)
        $.ajax({
            method: 'DELETE',
            url: 'http://localhost:8080/city/' + cityName,
            type: JSON,
            success: function (data) {
            },
            error: function (xhr, text, error) {
            }
        })
        this.cityData.splice(cityIndex, 1)

    }



}
