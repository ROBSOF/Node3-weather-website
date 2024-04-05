const request = require('postman-request');

const forcast = (latude,logitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=bd74677f16f5f5928163c76537770c52&query='+latude+','+logitude+'&units=f';
    request( {url,json:true},(error, {body})=>{
    if(error){
        callback('unable to connect to weather service!!', undefined)
    }else if(body.error){
        callback('unable to find locations', undefined)
    }else{
        callback(undefined,body.current.weather_descriptions[0]+". it is currently "+body.current.temperature+" degree out, it feels like "+ body.current.feelslike+" degree out .")
    }
})
}

module.exports = forcast;