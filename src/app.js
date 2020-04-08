const express=require('express');
const path= require('path');
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');
const app=express()
const hbs=require('hbs')
//Define path for express config
const directorypath=path.join(__dirname,'../Public')
const viewspath=path.join(__dirname,'../template/views')
const partialpath=path.join(__dirname,'../template/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewspath)
//setup static directory to serve
app.use(express.static(directorypath))
hbs.registerPartials(partialpath);

app.get('',(req,res)=>{
    res.render('index',{
        name:'Ahmad',
        title:'Index Title'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',
        {
            name:'Ahmad',
            title:'Help Title'
        }
    )
})
app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Ahmad',
        title:'About Title'
    });
})
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help Article Not Found'})
})
// Query String
app.get('/Weather',(req,res)=>{
    if(!req.query.address)
    {
     return res.send({ error:'Error:Please Provide Address'})   
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,{summary,temperature,precipProbability}={})=>{
            if(error){
                return res.send({error})
            }
            // //res.send('ForecastData:'+summary+'Temperator is'+temperature+'Chances of Rain'+precipProbability+'%')
            res.send({
                location: location,
                summary: summary,
                temperature: temperature,
                precipProbability: precipProbability
            })
            // res.render('weather',{
            //     location,summary,temperature,precipProbability
            // })
        })
    
    //     res.send({
    //     Address:req.query.address
    // })
    // res.render('error',{
    //     title:'Help Article Not Found'})
        })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Page Not Found'})
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000');
})