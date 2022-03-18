const request = require('request')

// 1600%20Pennsylvania%20Ave%20NW,%20Washington%20DC
const geocodingApiKey = '6ea12aff9e4b99d2958de97174036fb5'
var geocodingUrl = 'http://api.positionstack.com/v1/forward?access_key=' + geocodingApiKey + '&query='

const geocoding = (address, callback) => {
    geocodingUrl += address
    request({url: geocodingUrl, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Some error occurred!! Please check your connection and try again!', undefined)
        } else if (body.error) {
            callback('Some error occurred!! Err Msg: ' + body.error.message, undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude
            })
        }
    })
}

module.exports = geocoding