const request=require('request')

const geoCode=(location,callBackFunc)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoibXV0ZWViYWhtYWQxNDgiLCJhIjoiY2p6dnAwOWlqMHRiYjNjcDl0NzFjYnltdyJ9.S-fHFARRd1o7zcD-EhQ9jw"
    request({url,json:true},(error,{body}={})=>{
        if(error)
            callBackFunc("Enable to Connect",undefined)
        else if (body.features === undefined || body.features.length == 0)
            callBackFunc("Location doesn't exist",undefined)
        else {
            callBackFunc(undefined, {
                longitude: body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })

}


module.exports=geoCode