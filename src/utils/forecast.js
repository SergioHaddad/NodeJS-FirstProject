const request = require('request')
const chalk = require('chalk')
const forecast = (latitude,longtitude,callback) => {
    const url= 'http://api.weatherstack.com/current?access_key=a3c9377589fa3ac1d3ab0fd320df3840&query=' + latitude + ',' + longtitude +''
    request({url:url , json: true}, (error,{body}) => {
        if (error){
            callback('Unable to connect to the location Services', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            console.log(chalk.green('hello'))
           callback(undefined,chalk.green('hello ')+ chalk.green('It is currently ') + chalk.red(body.current.temperature) + ' degreens out.'
                + 'There is ' + body.current.precip + "% chance of rain " + body.current.weather_descriptions)
        }
    })
}
module.exports =forecast