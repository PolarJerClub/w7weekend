const getData = async (city, event) => {
    console.log(city)
    event.preventDefault()
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f85318dd8108d0f5079af0c22ddd41b4`)
    let result = await response.json()
    console.log(result)

    let tempF1 = convertCToF(result.main.temp_min)
    let tempF2 = convertCToF(result.main.temp_max)
    
    createList(result.id, result.name, result.weather[0].main, result.weather[0].description,
        tempF1, tempF2, result.main.humidity)
}

const DOMElements = {
    weatherList: '.weather-list'
}

const createList = (id, name, main, description, temp_min, temp_max, humidity) => {
    const html = `<div id=${id} class="card">
    <ul class="list-group list-group-flush" id=${id}>
    <h1 class="list-group-item">${name}</h1>
    <li class="list-group-item">Forecast: ${main}, ${description}</li>
    <li class="list-group-item">Low Temperature: ${temp_min}</li>
    <li class="list-group-item">High temperature: ${temp_max}</li>
    <li class="list-group-item">Humidity: ${humidity}</li>
    </ul>
    </div>
    `

    document.querySelector(DOMElements.weatherList).insertAdjacentHTML('beforeend', html)
}

const convertCToF = (temp) => {
    const tempF = (temp - 273.15) * (9/5) + 32
    const solution = Math.round(tempF * 10) / 10
    return solution
}