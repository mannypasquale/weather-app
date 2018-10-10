import axios from 'axios';

const APIKEY = '2103641325c378c3c869aafffaf642a8';


export function getWeather(city = "?q=London, UK") {
     return axios.get(`http://api.openweathermap.org/data/2.5/weather${city}&APPID=${APIKEY}`)
    .then(function(data) {
        return data;
    }).catch(function(error) {
        console.log(error);
    });
}



