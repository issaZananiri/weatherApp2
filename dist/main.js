const tempManager = new TempManager()
const renderer = new Renderer()


const loadPage = async function(){
    await tempManager.getDataFromDB() 
    renderer.renderData(tempManager.cityData)
}

loadPage()

const handleSearch = async function(){
    const cityInput = $("#search-input").val()
        await tempManager.getCityData(cityInput)
     renderer.renderData(tempManager.cityData)
}

$("#show-button").on("click", function(){
    handleSearch()
})


$("#display-cityData").on("click", ".save", function(){
    const cityName = $(this).siblings(".name").text()
    tempManager.saveCity(cityName)
})

$("#display-cityData").on("click", ".delete", function(){
    const cityName = $(this).siblings(".name").text()
    tempManager.removeCity(cityName)
    renderer.renderData(tempManager.cityData)
})

