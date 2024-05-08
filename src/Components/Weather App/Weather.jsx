import './Weather.css'
import React, { useState } from 'react'
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import humidity_icon from "../Assets/humidity.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"


function Weather(){ 
    const apiKey =  '1640f2702035f27ab98f9ee8399353a8'
    const [wicon,setWicon] = React.useState(clear_icon)

    const search = async () => {
        const element =  document.getElementById("city_input")
        
        if ( element.value ==="") {
            console.log("input is empty");
        } else {
            let url =  `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${apiKey}`
            
            let response = await fetch(url);
            let data = await response.json();

            const humidity =  document.getElementById("humidity")
            const wind =  document.getElementById("windSpeed")
            const temperature =  document.getElementById("temperature")
            const location =  document.getElementById("location")
            
            humidity.innerHTML = data.main.humidity + '%'
            wind.innerHTML = Math.floor(data.wind.speed) + 'km/h'
            temperature.innerHTML =  Math.floor(data.main.temp) + '°c'
            location.innerHTML = data.name

            if (data.weather?.[0]?.icon === "01d" || data.weather?.[0]?.icon === "01n") {
                setWicon(clear_icon);
            } else if (data.weather?.[0]?.icon === "02d" || data.weather?.[0]?.icon === "02n") {
                setWicon(cloud_icon);
            } else if (data.weather?.[0]?.icon === "03d" || data.weather?.[0]?.icon === "03n") {
                setWicon(drizzle_icon);
            } else if (data.weather?.[0]?.icon === "04d" || data.weather?.[0]?.icon === "04n") {
                setWicon(drizzle_icon);
            } else if (data.weather?.[0]?.icon === "09d" || data.weather?.[0]?.icon === "09n") {
                setWicon(rain_icon);
            } else if (data.weather?.[0]?.icon === "10d" || data.weather?.[0]?.icon === "10n") {
                setWicon(rain_icon);
            } else if (data.weather?.[0]?.icon === "13d" || data.weather?.[0]?.icon === "13n") {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }
        }    
    }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" id='city_input' className="city_input" placeholder='Search'/>
        <div className="search-icon">
            <img src={search_icon} alt='search icon' onClick={() => {search()}}/>
        </div>
      </div>
    
      <div className="weather-image">
            <img src={wicon} alt='cloudy'/>  
      </div>
      <div id='temperature' className="weather-temp">--</div>
      <div id='location' className="weather-location">--</div>  
      <div className="data-container"> 
        <div className="element">
            <img src={humidity_icon} alt="" className="icon" /> 
            <div className="data">
                <div id='humidity' className="humidity-parcentage">- -</div>
                <div className="text">Humidty</div>
            </div>
        </div>

        <div className="element">
            <img src={wind_icon} alt="" className="icon" /> 
            <div className="data">
                <div id='windSpeed' className="wind-speed">- -</div>
                <div className="text">Wind Speed</div>
            </div>
        </div>
      </div> 

    </div>
  )
}

export default Weather