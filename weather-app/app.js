const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

//using geocode function from geocode.js file
// geocode("New Delhi", (error, data) => {
//     console.log("Error", error)
//     console.log("Data", data)
// })

// forecast("New Delhi", (error, data) => {
//     console.log("Error ", error)
//     console.log("Data ", data)
// })
