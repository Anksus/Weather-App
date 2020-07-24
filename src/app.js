const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


// Defined path for express configs
const viewsPath = path.join(__dirname,'../templates/views')
const staticfiledir = path.join(__dirname,'../public')
const partialsPaths = path.join(__dirname,'../templates/partials')

// Setup for handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

// setup for static directories to serve
app.use(express.static(staticfiledir))


app.get('', (req,res)=>{

    
    res.render('index',{
        title: "Weather App",
        owner: "Ankit Susne",
        //location: location
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "plzz type something"
        })
    }

    geocode(address,(error,{latitude,longitude,location } = {} )=>{
        if (error) {
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
                return res.send({error})
            }

            res.send({

                forecast: forecastData.weather_descriptions[0],
                windspeed:forecastData.wind_speed ,
                humidity: forecastData.humidity,
                temperature: forecastData.temperature,
                location: location,
                address:address
            })

        })

    })
})


app.get('/about', (req,res)=>{
    res.render('about',{
        title: "About",
        owner: "Ankit Susne"
    })
})

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'../public/404.html'))
})

app.listen(port,()=>{
    console.log("We are listening at port" + port)
})