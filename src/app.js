const path = require('path');
const express = require('express');
const hbs = require('hbs')
const app = express();
//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const forcast = require('../src/utils/forcast');
const geoCode = require('../src/utils/geocode');

//setup handelbar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Ravi Ranjan Tiwari'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Ravi Ranjan Tiwari',
        helpText:'This is the help Text'
    })
})

app.get('/About',(req,res)=>{
    res.render('About',{
        title:'About',
        name:'Ravi Ranjan Tiwari'
    })
})

app.get('/title',(req,res)=>{
    res.send(`<h1>Title</h1>`)
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address Must be provided!!'
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error, forcastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcastData: forcastData,
                location,
                address: req.query.address
            })
        })
    })
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
          erorr: 'you must provide search tearm'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404Page',{
        title:'Help Page',
        erorMessage:'Help artical not found',
        name:'Ravi Ranjan Tiwari'
    })
})
app.get('*',(req,res)=>{
    res.render('404Page',{
        title:'404',
        erorMessage:'Page Not Found',
        name:'Ravi Ranjan Tiwari'
    })
})

app.listen(3000, ()=>{
    console.log('server is running on port 3000!!')
})

