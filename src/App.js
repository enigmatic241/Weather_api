import React, { useState } from 'react';
import swal from '../node_modules/sweetalert';
import './App.css';

const api={
    key: "fc2d905cfad96e406fcd9bf92e297d26",
    base:"https://api.openweathermap.org/data/2.5/"
}

const dateBuilder = (d) =>{
      let months=["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days =["Sunday","Monday","Tuesday","Wednesday"]


      let day= days[d.getDay()];
      let date=d.getDate();
      let month = months[d.getMonth()];
      let year =d.getFullYear();

      return `${day}, ${date} ${month}, ${year}`
}


function App() {
  const [query, setQuery]=useState('');
  const[weather,setWeather]=useState({}); 

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          if(result.cod=="404"){
            swal({
              title: "invalid city",
              text: "please enter valid city name!",
              icon: "warning",
            });
          }
        });
    }
  }

    return (
      <div className="app">
        <main>
          <div className="title">Weather Forecast</div>

          <div className="search-box">
              <input className="search-bar" 
                type="text"
                placeholder="search city " 
                onChange={e=> setQuery(e.target.value)}
                value={query}
                onKeyPress={search}/>
          </div>
            {(typeof weather.main !="undefined") ? (
          <div>
            <div className="location-box">
              <div className="city">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
                  <div className="temperature">
                      {Math.round(weather.main.temp)} °C
                  </div>
                  <div className="weather">
                  {weather.weather[0].main}
                  </div>
            </div>
          </div>
          ) :('')}
        </main>
      </div>
    );
  }


export default App;
