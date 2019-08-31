const request=require('request')
const forecast=(longitude,latitude,callBackFunc)=>{
    const url = "https://api.darksky.net/forecast/9bcfb06426e1f05ed926a62fbb721f03/" + latitude + "," + longitude + "?units=si"
    request({url, json: true}, (error, {body}) => {
        if (error)
            callBackFunc("Enable to Connect",undefined)
        else if (body.error)
            callBackFunc("Cann't find the weather for this location",undefined)
        else {
            callBackFunc(undefined, {
                temp : body.currently.temperature,
                precp : body.currently.precipProbability,
                summary:body.currently.summary
            });
        }
    })
}

module.exports=forecast