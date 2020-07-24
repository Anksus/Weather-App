const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const forecastM = document.querySelector('#forecastM')
const windspeed = document.querySelector('#windspeed')
const humidity = document.querySelector('#humidity')
const temperature = document.querySelector('#temperature')
const locationM = document.querySelector('#locationM')
const addressM = document.querySelector('#addressM')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loca  = search.value
    addressM.textContent = "Loading...."
    forecastM.textContent = ""
    windspeed.textContent = ""
    humidity.textContent = ""
    temperature.textContent = ""
    locationM.textContent = ""

    fetch(`http://localhost:3000/weather?address=${loca}`).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
           return addressM.textContent = data.error
        }
        forecastM.textContent = "Forecast : " + data.forecast
        windspeed.textContent = "Windspeed : " + data.windspeed
        humidity.textContent = "Humidity : " + data.humidity
        temperature.textContent = "Temperature : " + data.temperature
        locationM.textContent = "Result location : " + data.location
        addressM.textContent = "Searched location : "+data.address

    })
})
    
})

