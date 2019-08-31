const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geoCode=require('./geocode')
const forecast=require('./forecast')

const port=process.env.PORT ||3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath=path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
hbs.registerPartials(partialPath)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help'
    })
})

app.get('/weather', (req, res) => {
    console.log("Request Arived with IP:",req.connection.remoteAddress,' with port no :',req.connection.remotePort ,"at :",new Date())
    if(!req.query.location)
        return res.send({
            error:"Provide Location to see weather"
        })
    geoCode(req.query.location, (error, {longitude,latitude,location}={}) => {
        if (error)
            return res.render('error',{
                title: '404',
                desc:"Location not Found"
            })
        forecast(longitude, latitude,  (error, {temp,precp,summary}) => {
            if (error)
                return res.render('error',{
                    title: '404',
                    desc:"Location not Found"
                })
           res.render('weather',{
                location,
                temp,
                summary,
                precp:precp*100
            })
        })
    })
})

app.get('/help*', (req, res) => {
    res.render('error', {
        title: '4O4',
        desc:"Title page not Found"
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404 ',
        desc:"Page not Found"

    })
})
app.listen(port, () => {
    console.log('Server is up on port .',port)
})