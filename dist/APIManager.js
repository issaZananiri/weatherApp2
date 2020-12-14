//This is the class that will manage all your APIs

class APIManager {

    constructor(renderer)
     {
         this.cityData = []
         this.renderer = renderer
    }
    getDataFromDB()
    {
            $.ajax({
                type:"GET",
                url: `/cities`,
                success: async (ref) =>
                {
                this.cityData = await ref.map(city => ({
                    name: city.name,
                    temperature: city.temperature,
                    condition: city.condition,
                    conditionPic: city.conditionPic
                }))
                this.renderer.renderCities(this.cityData)
                }
            });
    }

    getCityData(cityName)
    {
        $.ajax({
            type:"GET",
            url: `/city/${cityName}`,
            success: async (ref) => {
                    const data = await ref
                    const newCity = {
                        name: data.name,
                        temperature: data.main.temp,
                        condition: data.weather[0].main,
                        conditionPic: data.weather[0].icon
                    }
                    this.cityData.push(newCity)
                    this.renderer.renderCities(this.cityData)
                }
            
        });
    }

    async saveCity(cityName)
    {
        const city = await this.cityData.find(w => w.name === cityName)
        $.ajax({
            type:"POST",
            contentType: "application/json",
            dataType: "json",
            url: `/city`,
            data: JSON.stringify(city),
            success: (result) =>
             {  
             }
             
            })
    }
    removeCity(cityName)
    {
        $.ajax({
            type:"DELETE",
            url: `/city/${cityName}`,
            success:  (result) => {
                const index = this.cityData.findIndex(w => w.name === cityName)
                this.cityData.splice(index,1)
                this.renderer.renderCities(this.cityData)
                },
            error: (mess) => (console.log(mess))
        });
            
    }
}
