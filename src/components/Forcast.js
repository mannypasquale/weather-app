import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getWeather} from '../utils/api';
import {getProfile} from '../utils/api';
import {getRepos} from '../utils/api';
import axios from 'axios';
import { Link } from 'react-router-dom';
// console.log(getWeather());
// console.log(this.props);

function WeatherResult(props) {
    console.log(props);
    return (
        <ul className='weather-list'>
            <li>{props.weather.name}</li>
            <li>Temp: {props.weather.main.temp - 273.15}</li>
            <li>Temp High: {props.weather.main.temp_max -  273.15}</li>
            <li>Temp Low: {props.weather.main.temp_min -  273.15}</li>
            <li>Description: {props.weather.weather[0].description}</li>
        </ul>
    );
}



class Forcast extends Component {
    state = {
        Weather: null
    }
    componentDidMount() {
        this.updateWeather();
    }
    updateWeather = () => {
        
        getWeather(this.props.location.search).then( (data) => {
            this.setState(() => ({
                Weather: data.data
            }))
        });
    }

    handleReset = () => {
        this.setState(() => ({
            Weather: null
        }));
    }

    render() {

        

        // let x = getWeather().then(function (pop) {
        //         console.log(pop['data']['main']);
        //     });
        return (
            <div className='results'>
                {!this.state.Weather
                    ? <p className='loading-page'>Loading</p> : <WeatherResult weather={this.state.Weather} />

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