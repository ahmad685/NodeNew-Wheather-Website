const request=require('request'); 
const geocode=(address,callback)=>{
    const url='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWhtYWQtYWttYWwiLCJhIjoiY2s3eDl6Nzh1MDVneTNsc2E4YW14cjhiZiJ9.XjQgf8hFjqGOa-jvM1rvjA&limit=5'
    request({url:url , json:true},(error,{body})=>{
        if(error)
        {
           callback('Unable to connect to local services',undefined);
        }else if(body.features.length===0)
        {
           callback('Try another seach Recoerd Not found',undefined);
        }else{
        //    callback(undefined,{
        //        latitude: responce.body.features[0].center[0],
        //        longitude:responce.body.features[0].center[0],
        //        Location:responce.body.features[0].place_name
        //        //Shorthand
        //    })
           const geodata={
            latitude: body.features[0].center[0],
            longitude:body.features[0].center[1],
            location:body.features[0].place_name
           }
           callback(undefined,geodata)
        }
    })
}

module.exports=geocode