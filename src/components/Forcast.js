import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getWeather, getForcast} from '../utils/api';

import { Link } from 'react-router-dom';
import {Nav} from './Home';
// console.log(getWeather());
// console.log(this.props);

function WeatherResult(props) {
    console.log(props);
    if (!props.weather) {
        return <div><p>Invalid Input Reset to try again</p></div>;
    } else {
        return (
        
            <ul className='weather-list'>
                <li><h1>{props.weather.name}</h1></li>
                <li>Temp: {props.weather.main.temp - 273.15}</li>
                <li>Temp High: {props.weather.main.temp_max -  273.15}</li>
                <li>Temp Low: {props.weather.main.temp_min -  273.15}</li>
                <li>Description: {props.weather.weather[0].description}</li>
            </ul>
        );
    }
}

function badResult() {
    return (
        <div><p>BAD RES</p></div>
    )
}



class Forcast extends Component {
    state = {
        Weather: null,
        Forcast: null,
        isValidInput: false
    }
    componentDidMount() {
        this.updateWeather();
        this.updateForcast();
    }
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.location.search !== prevProps.location.search) {
          this.updateWeather();
          this.updateForcast();
        }
      }
    updateWeather = () => {
        let weather;
        getWeather(this.props.location.search).then( (data) => {
            weather = data.data;
        }).catch((error) => {
            console.log("FALIDED REQUEST" + error);
        }).then(() => {
            this.setState(() => ({
                Weather: weather,
                isValidInput: true
            }))
        });
        
    }

    updateForcast = () => {
        let forcast;
        getForcast(this.props.location.search)
            .then((data) => {
                forcast = data;
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

    render() {


        return (
            <div className='forcast-container'>
            <Nav />
            
                {!this.state.isValidInput 
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