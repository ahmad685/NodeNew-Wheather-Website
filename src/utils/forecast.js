const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/b747edba861377909b77e015f489819a/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'? units=[si]';
    request({url, json:true},(error,{body})=>{
        if(error)
        {
            callback('Error',undefined);
        }else if(body.error){
            callback('Your search Record not found',undefined);
        }else{
            // callback(undefined,{
            //     temperature:body.currently.temperature,
            //     precipProbability:body.currently.precipProbability,
            //     'summary':body.currently.summary
            // })
            const forecastdata={
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability,
                'summary':body.currently.summary
               }
               callback(undefined,forecastdata)

        }
    })

}
module.exports=forecast