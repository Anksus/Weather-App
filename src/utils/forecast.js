const request = require('postman-request')
const API_KEY = require('../../config')

const forecast = (longitude,latitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY.forecast_key}&query=${latitude},${longitude}`

     request({url:url, json:true},(error,response)=>{
        if (error) {
         
            return callback(error,undefined)
        }
        if (response.body.error) {
           return callback("unable to find location",undefined)
        }
        callback(undefined,response.body.current)
     })
}
module.exports = forecast

