const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const Dsc = require('./utils/PocketTest')
const { RSA_NO_PADDING } = require('constants')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const port = process.env.PORT || 3000
/////////Defines paths for Express config 
const app = express()
const publicDrectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const PartialPath = path.join(__dirname,'../templates/partials')
//setup handlebars engine and views location
app.set('view engine', '.hbs')
app.set('views',viewsPath)
hbs.registerPartials(PartialPath)

//setup static directory to serve 
app.use(express.static(publicDrectoryPath))

// const AboutPath = path.join(__dirname, '../public/about.html')
// app.use(express.static(AboutPath))
// app.get('/about', (req,res) => {
//     res.render('about')  
// })

// const HelpPath = path.join(__dirname, '../public/Help.html')
// app.use(express.static(HelpPath))

// Home 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sergio Haddad'
    })
})

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sergio'
    })
})

//Weather
app.get('/WeatherEx',(req,res) => {
    res.render('WeatherEx',{
        Title: 'Welcome to The Weather Page!'
    })
})

//Help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is me sergio',
        
    })
})
app.get('/Weather', (req ,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude,longtitude,location}={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({ 
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
//PocketManagment 
app.get('/PocketManag',(req,res) => {
    res.render('PocketManag'
    )
})
//getingDiscountResult
// app.get('/Pocky',(req,res) =>{
//     Dsc(1000)
// })
app.listen(port, () => {
    console.log('Server is up on port 3000.'+ port)
})