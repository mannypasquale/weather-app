import React, { Component } from 'react';
import {getForcast} from '../utils/api';

import { Link } from 'react-router-dom';
import {Nav} from './Home';
// console.log(getWeather());
// console.log(this.props);


function WeatherResult(props) {
    console.log(props);
    console.log(props.getDate(props.weather.forcast[0].date));
    if (!props.weather) {
        return <div><p>Invalid Input Reset to try again</p></div>;
    } else {
        return (
            <ul className="weather-list">
                {props.weather.forcast.map(function (weather) {
                    return (
                        <li className="weather-item">{weather.city}
                            <ul className="space-weather-item">
                                <li>{weather.date}</li>
                                <li>{weather.description}</li>
                                <li>{weather.humidity}</li>
                                <li>{weather.temp_max}</li>
                                <li>{weather.temp_min}</li>
                            </ul>
                        </li>
                    )
                })}
            </ul>
            
        );
    }
}





class Forcast extends Component {
    state = {
        Weather: null,
        isValidInput: false
    }
    componentDidMount() {
        // this.updateForcast();
        this.updateWeather();
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.location.search !== prevProps.location.search) {
          this.updateWeather();
        }
      }
    updateWeather = () => {
        // let weather;
        // getWeather(this.props.location.search)
        // .then( (data) => {
        //     weather = data.data;
        // }).catch((error) => {
        //     console.log("FALIDED REQUEST" + error);
        // }).then(() => {
        //     this.setState(() => ({
        //         Weather: weather,
        //         isValidInput: true
        //     }))
        // });
        let forcast;
        
        getForcast(this.props.location.search)
            .then((data) => {
                forcast = data;
            }).catch((error) => {
                console.log(error);
            }).then(() => {
                // here i need to make a new object iwht needed info with the new
                // min/max/description/humitdiy
                let extractedForcast = {
                    city: forcast.city.name,
                    country: forcast.city.country,
                    forcast: []

                }
                //need this to only return the 5 days
                 let x = forcast.list.map(function (weather) {

                    return (
                        {
                            date: new Date(weather.dt_txt).toDateString(),
                            temp_min: weather.main.temp_min,
                            temp_max: weather.main.temp_max,
                            humidity: weather.main.humidity,
                            description: weather.weather[0].description,
                            icon: weather.weather[0].icon

                            
                        }
                    );
                });
                let y = [];
                for (let i = 0; i < x.length; i++){
                    if (y.includes(x[i].date)){
                        console.log('isthere');
                    } else {
                        y.push(x[i]);
                    }
                }
                console.log(y);
                
               
                extractedForcast.forcast = x;

                console.log(extractedForcast);
                this.setState(() => ({
                    Weather: extractedForcast,
                    isValidInput: true
                }))
            });
        
    }

    updateForcast = () => {
        let forcast;
        getForcast(this.props.location.search)
            .then((data) => {
                forcast = data.data;
            }).catch((error) => {
                console.log(error);
            }).then(() => {
                this.setState(() => ({
                    Forcast: forcast
                }))
            });
    }

    handleReset = () => {
        this.setState(() => ({
            Weather: null
        }));
    }

    getDate = (dateString) => {
        let date = new Date(dateString);
        return date;
    }

    render() {
        
        

        return (
            <div className='forcast-container'>
            <Nav />
            
                {!this.state.isValidInput 
                    ? <p className='loading-page'>Loading</p> : <WeatherResult weather={this.state.Weather} forcast={this.state.Forcast} getDate={this.getDate} />

                }
                
                <Link
                    className='reset'
                    to='/'
                    onClick={() => this.handleReset()}>
                    Reset
                        </Link>            </div>
        );
    }
}


export default Forcast;