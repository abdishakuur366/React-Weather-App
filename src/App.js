//import UilReact from '@iconscout/react-unicons/icons/uil-react'
import React, { useEffect, useState } from 'react';
// eslint-disable-ni=ext-line
import './App.css';
import TopButtons from './Components/TopButtons';
import Inputs from './Components/Inputs';
import TimeAndLocation from './Components/TimeAndLocation';
import TempretureAndDetails from './Components/TempretureAndDetails';
import Forecast from './Components/Forecast';
import getWeatherData from './Services/WeatherService';
import getFormattedWeatherData from './Services/WeatherService';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [query, setQuery]= useState({q: 'mogadishu'});
  const [units, setUnits]= useState('metric');
  const [weather, setWeather]= useState(null)

  useEffect(()=>{
    const fetchWeather = async () =>{
      const message = query.q ? query.q : 'current location'
      toast.info('Fetching weather for ' + message)
      await getFormattedWeatherData({...query, units}).then(
        data =>{

          toast.success(`Successfully fetched weather for ${data.name}, ${data.country} `)
          setWeather(data)
        })
      
  };

  fetchWeather();

  }, [query, units])

  const formatBackgroundColor = () =>{
    if(!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60;
    if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700';

    return 'from-yellow-700 to-orange-700'
  }


  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl
    shadow-gray-400 rounded-2xl font-bold ${formatBackgroundColor()}`}>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && 

        <div>
          <TimeAndLocation weather={weather}/>
          <TempretureAndDetails weather={weather}/>

          <Forecast title='Hourly Forecast'  items={weather.hourly}/>
          <Forecast title='Daily Forecast' items={weather.daily}/>
        </div>
      
      }

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />

      

    </div>
  );
}

export default App;

