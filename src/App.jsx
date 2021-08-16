import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';
import { BiSearchAlt2 } from 'react-icons/bi';
import { RiUserLocationFill } from 'react-icons/ri';
import axios from 'axios';
import weather from './weather Icons/svg/046-weather.svg';
import Sun from './weather Icons/png/036-sun.png';
import Clouds from './weather Icons/svg/004-clouds.svg';
import Haze from './weather Icons/svg/016-haze.svg';
import Thunderstorm from './weather Icons/svg/041-thunderstorm.svg';
import Snow from './weather Icons/svg/033-snowy.svg';
import Rain from './weather Icons/svg/027-rain.svg';
import Mist from './weather Icons/svg/029-raindrop.svg';
import sunrise from './weather Icons/svg/012-dawn.svg';
import sunset from './weather Icons/svg/037-sunset.svg';



const App = () => {
// Variables
    const WeatherIcon = document.getElementById('weatherIcon');
    var realtimeTemp = "";
    const Location = document.getElementById('locationName');
    const MaxTemp = document.getElementById('maxTemp');
    const MinTemp = document.getElementById('minTemp');
    const CurrTemp = document.getElementById('currTemp');
    const Sunrise = document.getElementById('Sunrise');
    const Sunset = document.getElementById('Sunset');
    const Feelslike = document.getElementById('Feelslike');
    const CurrConditions = document.getElementById('currConditions');
    const Wind = document.getElementById('wind');

    // console.log(WeatherIcon);
    

// Getting Current Date 
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var date = new Date();
    const currDay = date.getDay();
    const currMonth = date.getMonth();
    const currDate = date.getDate();

// Converting seconds to HH:MM string
    const seccondsToTime = (seconds) => {
        const dateObj = new Date(seconds*1000);
        var hours = dateObj.getUTCHours() + 5;
        if(hours > 24){
            hours -= 24;
        }
        var mins = dateObj.getUTCMinutes() + 30;
        if(mins > 60){
            hours += Math.floor(mins/60); 
            mins = mins % 60;
        }
        const timeString = hours.toString().padStart(2,0) + ':' + mins.toString().padStart(2,0);
        return timeString;
    }

// useState Hook to access the input value   
    const [cityName, setCityName] = useState("");

// Handling change in input value
    const handleChange = (e) => {
        setCityName(e.target.value);
        // console.log(cityName);
    }

//Handling get request on button click and update DOM content.
    const HandleClick = (e) => {
        const city = document.getElementById('city').value;
        //console.log(city);
        // fetch('http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=cb5827fcdadda1188912281a8e46933f')
        // .then(response=> console.log(response) )        
        // .catch(error => console.log(error); )
        
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=cb5827fcdadda1188912281a8e46933f`)
        .then((response) => {
            realtimeTemp = response.data;
            // console.log(realtimeTemp);
            Location.innerHTML = `${realtimeTemp.name}, ${realtimeTemp.sys.country}`;
            MaxTemp.innerHTML =  Math.floor(realtimeTemp.main.temp_max);
            MinTemp.innerHTML = Math.floor(realtimeTemp.main.temp_min);
            CurrTemp.innerHTML = realtimeTemp.main.temp;
            Sunrise.innerHTML = seccondsToTime(realtimeTemp.sys.sunrise);
            Sunset.innerHTML = seccondsToTime(realtimeTemp.sys.sunset);
            Feelslike.innerHTML = Math.floor(realtimeTemp.main.feels_like);
            CurrConditions.innerHTML = realtimeTemp.weather[0].main;
            Wind.innerHTML = realtimeTemp.wind.speed;

            // if(realtimeTemp.weather[0].main === 'Clouds'){
            //     WeatherIcon.innerHTML = `<img src=${weather} alt="" />`
            //     console.log(WeatherIcon.innerHTML);
            // }
            switch(realtimeTemp.weather[0].main){
                case 'Clouds': WeatherIcon.innerHTML = `<img src=${Clouds} alt="" />`
                break;
                case 'Mist': WeatherIcon.innerHTML = `<img src=${Mist} alt="" />`               
                break;
                case 'Rain': WeatherIcon.innerHTML = `<img src=${Rain} alt="" />`
                break;
                case 'Clear': WeatherIcon.innerHTML = `<img src= ${Sun} alt="" />}`           
                break;
                case 'Sunny': WeatherIcon.innerHTML = `<img src=${Sun} alt="" />`
                break;
                case 'Thunderstorm': WeatherIcon.innerHTML = `<img src=${Thunderstorm} alt="" />`
                break;
                case 'Haze': WeatherIcon.innerHTML = `<img src=${Haze} alt="" />`
                break;
                case 'Snow': WeatherIcon.innerHTML = `<img src=${Snow} alt="" />`
                break;
                case 'Drizzle': WeatherIcon.innerHTML = `<img src=${Rain} alt="" />`
                break;

                default: WeatherIcon.innerHTML = `<img src= ${weather} alt="" />}`
            }
            
        })
        .catch(error => {console.log(error);})
        
    }
    
    return (
        <>
            <div className="container-fluid py-lg-5 py-0 app-container">
                <div className="container main-content px-3 pt-5 pb-4">
                    <div className="form d-flex justify-content-center align-items-center">
                        <input type="text" id="city" placeholder= "Enter a city" onChange={handleChange} value = {cityName}/>
                        <button className='btn' onClick = {HandleClick}>
                            <BiSearchAlt2 className="search-icon"/>
                        </button>
                        
                    </div>
                    <div className="weather-icon d-flex justify-content-center align-items-center" id="weatherIcon">
                        <img src={weather} alt="" />
                    </div>
                    <div className="weather-condition">
                        <div className="location d-flex justify-content-center align-items-center">
                            <RiUserLocationFill className="userLocation-icon"/>
                            <h1 className="locationName mb-2" id="locationName">   </h1>
                        </div>
                        <div className="currDate d-flex justify-content-between align-items-center">
                            <h3>{days[currDay]} | {months[currMonth]}, {currDate}</h3>

                            <div className="minNmaxtemp d-flex justify-content-center align-items-center">
                                <h4 className="max-mintemp">Min: <span id="minTemp"></span>&deg;C | Max: <span id="maxTemp"></span>&deg;C</h4>
                            </div>
                        </div>
                        <div className="temp-data my-2 mb-3 d-flex justify-content-between align-items-center">
                            <h1 className="currTemp"><span id="currTemp">  </span>&deg;C</h1>
                            <div className="sunrise">
                                <h4 className="sunriseTime"><img src={sunrise} alt="sunrise" /> <span id="Sunrise"></span>hrs</h4>
                                {/* <h4 className="sunriseTime">Sunrise: <span id="Sunrise">    </span>hrs</h4> */}
                                <h4 className="sunsetTime"><img src={sunset} alt="sunset" /> <span id="Sunset">    </span>hrs</h4>
                                {/* <h4 className="sunsetTime">Sunset: <span id="Sunset">    </span>hrs</h4> */}
                            </div>
                        </div>
                        <div className="weather-data d-flex justify-content-between align-items-center">
                            <h4 className="feelsLike">Feels like: <span id="Feelslike">  </span>&deg;C</h4>
                            <h4 className="currConditions" id="currConditions">     </h4>
                            <h4 className="wind">Wind: <span id="wind">  </span>kmph</h4>
                        </div>
                        <p className="rider">* Sunrise & sunset time is based on GMT+05:30.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App