const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const image = document.querySelector(".weather-img")
const cardTitle = document.querySelector(".card-title")
const weatherInfo = document.querySelector(".weather-info")
const dateAndTime = document.querySelector(".date-and-time")

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    try{
   const response = await fetch('/weather?address=' + location, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })

 
  const data = await response.json()


  if(data.errorMessage){
    throw new Error(data.errorMessage)
  }

 
   if(data.current){
    search.value=""
    messageOne.textContent=""

    image.src= data.current.weather_icons[0]
    image.classList.add("updated-weather-image")
    cardTitle.textContent = data.request.query
     weatherInfo.textContent = `The temperature is ${data.current.temperature}°C with ${data.current.weather_descriptions[0]}, and the wind from the ${data.current.wind_dir} is blowing at ${data.current.wind_speed} km/h, creating a feels-like temperature of ${data.current.feelslike}°C. The UV index is ${data.current.uv_index}, and visibility is ${data.current.visibility} km. Stay informed and enjoy your day in ${data.location.name}, ${data.location.region}!`
     dateAndTime.textContent = `Date: ${data.location.localtime.split(" ")[0]}, Time: ${data.location.localtime.split(" ")[1]}`
   }

  }
  catch(error){
      messageOne.textContent=""
      search.value= ""
      messageTwo.textContent= error.message
      messageTwo.classList.add("error-message")
    
  }


})