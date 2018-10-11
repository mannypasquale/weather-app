import axios from 'axios';

const APIKEY = '2103641325c378c3c869aafffaf642a8';


export function getWeather(city) {
     return axios.get(`http://api.openweathermap.org/data/2.5/weather${city}&APPID=${APIKEY}`)
    .then(function(data) {
        return data;
    }).catch(function(error) {
        console.log(error);
    });
}
export function getForcast(city) {
    return axios.get(`http://api.openweathermap.org/data/2.5/forecast${city}&APPID=${APIKEY}&cnt=3`)
    .then(function(data) {
        return data;
    }).catch(function(error) {
        console.log(error);
    });
}



