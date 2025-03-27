import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import moment from 'moment';
import cloudy from './assets/Photos/cloudy.png';
import rainy from './assets/Photos/Rainy.png';
import snowy from './assets/Photos/snowy.png';
import sunnyimage from './assets/Photos/Sunnyimage.png';
import temperature from './assets/Photos/Temperature.png';
import weatherdesc from './assets/Photos/weatherdesc.png';

function App() {
  const [city, setcity] = useState('');
  const [weather, setweather] = useState('');
  const [temp, settemp] = useState('');
  const [desc, setdesc] = useState('');
  const [speed, setspeed] = useState('');
  const [data, setdata] = useState(null);
  const [textflag, settextflag] = useState(false);
  const [location, setlocation] = useState('');

  const weatherimages = {
    Clear: sunnyimage,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Mist: cloudy,
    Haze: cloudy,
  };

  const weatherimage = data && data.weather ? weatherimages[data.weather[0].main] : null;

  let date = new Date();
  let formatdate = moment(date).format('Do, MM, YYYY'); // Corrected format

  useEffect(() => { }, []);

  function handlecity(event) {
    setcity(event.target.value);
  }

  function getweather() {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5dc2d12cf5942caec1f95c66a6dca95e`
    )
      .then(function (success) {
        setdata(success.data);
        setweather(success.data.weather[0].main);
        settemp((success.data.main.temp - 273.15).toFixed(2));
        setdesc(success.data.weather[0].description);
        setspeed(success.data.wind.speed);
        setlocation(success.data.name);
        settextflag(false);
      })
      .catch(function (error) {
        console.error('Error fetching weather data:', error);
        settextflag(true);
        ClearState();
        alert('Invalid country name');
      });
  }

  function ClearState() {
    setlocation('');
    setdata(null);
    settemp('');
    setweather('');
    setspeed('');
  }

  return (
    <div className="flex flex-col flex-wrap">
      <div className="bg-[#4B27D5] flex flex-col flex-wrap text-center">
        <div className="py-10 rounded-md items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            onChange={handlecity}
            className="bg-white border ml-5 rounded-3xl w-40 sm:w-60 md:w-80 lg:w-96 border-none outline-none mt-5 p-3 text-sm"
          />

          <button
            className="bg-white rounded-4xl p-3 ml-4 mt-5 text-black cursor-pointer w-fit"
            onClick={getweather}
          >
            <CiSearch />
          </button>
          <br />

          {data && (
            <div className="border-none rounded-md flex flex-col w-2xl items-center justify-center ml-0 sm:ml-0 md:ml-0 lg:ml-[25%] xl:ml-[25%] flex-wrap">
              <div className="bg-white p-5 w-fit mt-6 flex flex-col justify-center items-center border-none rounded-2xl">
                <h1 className="text-2xl font-medium mt-2">{location}</h1>
                {weatherimage && <img src={weatherimage} alt={weather} className="w-[10%] mt-2" />}
                <h1 className="text-2xl font-medium mt-2">Date: {formatdate}</h1>
                <h1 className="text-2xl font-medium mt-2">Temperature: {temp} °C</h1>
                <h1 className="text-2xl font-medium mt-2">Weather: {weather}</h1>
              </div>

              <div className="bg-white p-5 w-fit mt-6 flex flex-col justify-center items-center border-none rounded-2xl flex-wrap">
                <img src={weatherdesc} alt="weather description" className="w-[10%]" />
                <h1 className="text-2xl font-medium mt-2">Description: {desc}</h1>
              </div>

              <div className="bg-white p-5 w-fit mt-6 flex flex-col justify-center items-center border-none rounded-2xl flex-wrap">
                <img src={temperature} alt="temperature" className="w-[10%]" />
                <h1 className="text-2xl font-medium mt-2">Speed: {speed} m/s</h1>
              </div>
            </div>
          )}

          {textflag && <p className="text-red-500 mt-2">Invalid country name</p>}
        </div>
      </div>
    </div>
  );
}

export default App;