import { DateTime } from "luxon";

const API_KEY='c699f0d1fe91d8eedc37bc65d2a9ef4a';
const BASE_URL="https://api.openweathermap.org/data/2.5";
const getWeatherData=(infoType, searchParams)=>{
    const url=new URL(BASE_URL + '/' + infoType)
    url.search=new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url).then((res)=>res.json())
};

const formatCurrentWeather= (data)=>{
    const {
        coord:{lat, lon},
        main:{temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country, sunrise, sunset},
        weather,
        wind:{speed}
    } = data;

    const {main, description, icon} = weather[0]

    return{lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, description, icon, weather, speed}
}

const formatForecastWeather=(data)=>{
    let {timezone, daily, hourly}=data;
    daily = daily.slice(1,6).map(
        d=>{
            return{
                title: formatToLocalTime(d.dt, timezone, 'ccc'),
                temp:d.temp.day,
                icon:d.weather[0].icon
            }
        }
    );

    hourly = hourly.slice(1,6).map(
        d=>{
            return{
                title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
                temp:d.temp,
                icon:d.weather[0].icon
            }
        }
    );

    return { timezone, daily, hourly }
}

const getFormattedWeatherData = async (searchParams)=>{
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    const {lat, lon}=formattedCurrentWeather;

    const formattedForecastWeather= await getWeatherData('onecall',{
        lat, lon, exclude: 'current,minutely,alerts', units:searchParams.units
    }).then(formatForecastWeather);

    return {...formattedCurrentWeather, ...formattedForecastWeather}
};

const formatToLocalTime=(secs, zone, format=
    "cccc, dd LLL yyyy ' | Local time: 'hh:mm a")=>DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const iconUrlFromCode= (code)=>`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode};