const request = require('postman-request');
const geoCode = (current_address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(current_address)+'.json?access_token=pk.eyJ1IjoicmF2aXJhbmoiLCJhIjoiY2x0YjR6Z21oMGxnODJpbWx6bmRwejBxYiJ9.3WHbGFFo35Hsod1EQiWdUw&limit=1';

    request({url, json:true},(error, {body})=>{
        if(error){
            callback('unable to coneect to location services', undefined)
        }else if(body.features.length == 0){
            callback('unable to find latitude & logtitude!!', undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode;