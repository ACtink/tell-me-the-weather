const request = require('request')
const dotenv = require("dotenv")

dotenv.config()


API_KEY = process.env.API_KEY



const forecast = async (address)=>{
    let forcastedData = {}
    const url= `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${address}`
   const response = await fetch(url, {
       method: 'GET',
       mode: 'cors',
       headers: { 'Content-Type': 'application/json' }
     })

  return response
    

}

module.exports = forecast