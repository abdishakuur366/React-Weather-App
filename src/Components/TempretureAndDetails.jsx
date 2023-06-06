import React from 'react'
import * as Unicons from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../Services/WeatherService';
function TempretureAndDetails({weather: {
  description, icon, temp, temp_min, temp_max, sunrise, 
  sunset, speed, humidity, feels_like, timezone
}}) {
  return (
    <div>


        <div className='flex items-center justify-center 
        py-6 text-xl text-cyan-300 font-normal
        '>
            <p>{description}</p>
        </div>

        <div className='flex flex-row items-center justify-between
        text-white py-3'>
            <img src={iconUrlFromCode(icon)} 
            alt="" className='w-20' />
            
            <p className=' text-5xl font-normal'>
                {`${temp.toFixed()}`}&deg;
            </p>
                <div className='flex flex-col space-y-2'>
                <div className='flex font-light text-sm items-center justify-center'>
                <Unicons.UilTemperature size={18} className='mr-1'/>
                Real Feel
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}`}&deg;</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center'>
                <Unicons.UilTear size={18} className='mr-1'/>
                Humidity
                <span className='font-medium ml-1'>{`${humidity.toFixed()}`}%</span>
                </div>

                <div className='flex font-light text-sm items-center justify-center'>
                <Unicons.UilWind size={18} className='mr-1'/>
                Wind
                <span className='font-medium ml-1 '>{`${speed.toFixed()}`}Km/h</span>
                </div>

                

                
            </div>
        </div>

        <div className='flex flex-row items-center 
        justify-center space-x-2 text-white text-sm py-3'>
            <Unicons.UilSun/>
            <p className='font-light '>
              Rise: <span className='font-medium ml-1'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
            </p>
            <p className='font-light'></p>

            <Unicons.UilSunset/>
            <p className='font-light '>
              Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
            </p>
            <p className='font-light'></p>

            <Unicons.UilArrowUp/>
            <p className='font-light '>
              High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}`}&deg;</span>
            </p>
            <p className='font-light'></p>

            <Unicons.UilArrowDown/>
            <p className='font-light '>
              Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}`}&deg;</span>
            </p>
            <p className='font-light'></p>
        </div>

    </div>
  )
}

export default TempretureAndDetails