const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.geoapify.com/v1/geocode/search?text=' + encodeURIComponent(address) + '&apiKey=8207692c20594dd1aff96bd87a4b2b3e'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                'latitude': body.features[0].properties.lat,
                'longitude': body.features[0].properties.lon,
                'location': body.features[0].properties.formatted
            })
        }
    })
}

module.exports = geocode