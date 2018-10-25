import React, { Component } from 'react';
import { getForcast } from '../utils/api';
import { Link } from 'react-router-dom';
import { Nav } from './Home';



function Day(props) {
    let Icon = require(`../images/weather-icons/${props.location.state.weather.icon}.svg`);
    console.log(props);
    return (
        <div className='day-container'>
            <Nav />

            <ul className='day-list'>
                <li><img className='icon' src={Icon} alt='asfd' /></li>
                <li>{props.location.state.weather.date}</li>
                <li></li>
                <li>{`${props.location.state.City}, ${props.location.state.Country}`}</li>
                <li>{props.location.state.weather.description}</li>
                <li>min temp: {props.location.state.weather.temp_min} Degrees</li>
                <li>max temp: {props.location.state.weather.temp_max} Degrees</li>
                <li>Humidity: {props.location.state.weather.humidity}</li>
                <li>
                <Link 
                    className='button'
                    to={{
                        pathname: '/forcast',
                        search: `${props.location ? "?q=" + props.location.state.City + "," +
                        props.location.state.Country : "INVALID"}` 
                    }}>
                    Back  
                </Link>
                &nbsp;
                &nbsp;                
                <Link
                    className='button'
                    to='/'
                    onClick={() => this.handleReset()}>
                    Reset
                </Link>
                
                 </li>

            </ul>

        </div>

    )
}

class WeatherResult extends Component {
    state = {
        Weather: null,
        Country: null,
        City: null
    }

    componentDidMount() {
        // this.updateForcast();
        this.updateWeather();
    }

    updateWeather = () => {
        let fiveDay = [];
        let dayOfWeek = []
        let day;
        console.log(this.props.weather.city);
        for (let i = 0; i < this.props.weather.forcast.length; i++) {
            day = this.props.weather.forcast[i].date.split(' ');
            day = day[0];
            if (dayOfWeek.includes(day)) {
                continue;
            }
            dayOfWeek.push(day);
            fiveDay.push(this.props.weather.forcast[i]);
        }
        this.setState(() => ({
            Weather: fiveDay,
            Country: this.props.weather.country,
            City: this.props.weather.city
        }));
    }

    render() {
        if (!this.state.Weather) {
            return <div><p>Invalid Input Reset to try again</p></div>;
        } else {
            console.log(this.state);
            let city = this.state.City;
            let country = this.state.Country;
            return (
                <div>
                    <h1>{`${this.state.City}, ${this.state.Country}`}</h1>
                    <ul className="weather-list">
                        {this.state.Weather.map(function (weather) {
                            let Icon = require(`../images/weather-icons/${weather.icon}.svg`);
                            return (
                                //each of these will be a link!!!
                                <li className="weather-item">{weather.city}
                                    <ul className="space-weather-item">
                                        <li><Link to={{
                                            pathname: '/forcast/day',
                                            state: {
                                                weather: weather,
                                                City: city,
                                                Country: country
                                            }
                                        }} ><img className='icon-list' src={Icon} alt='asdf' /></Link></li>
                                        <li>{weather.date}</li>
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        }
    }
}





class Forcast extends Component {
    state = {
        Weather: null,
        isValidInput: null

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
        if (!this.props.location.search) {
            console.log("NO DATA");
        } else {


            let forcast;

            getForcast(this.props.location.search)
                .then((data) => {
                    forcast = data;
                }).catch((error) => {
                    console.log(error);
                }).then(() => {
                    // here i need to make a new object iwht needed info with the new
                    // min/max/description/humitdiy

                    //need this to only return the 5 days

                    //check if valid input returned
                    if (!forcast) {
                        this.setState(() => ({
                            isValidInput: false
                        }));
                        return;
                    }
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
                    for (let i = 0; i < x.length; i++) {
                        if (y.includes(x[i].date)) {
                            console.log('isthere');
                        } else {
                            y.push(x[i]);
                        }
                    }


                    let extractedForcast = {
                        city: forcast.city.name,
                        country: forcast.city.country,
                        forcast: x
                    }

                    this.setState(() => ({
                        Weather: extractedForcast,
                        isValidInput: true
                    }))
                });

        }
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

        // let checkInput = this.state.isValidInput;
        // let weather;
        // if (checkInput){
        //     weather = <WeatherResult weather={this.state.Weather} forcast={this.state.Forcast} getDate={this.getDate} />;
        // } 

        return (
            <div className='forcast-container'>
                <Nav />

                {!this.state.isValidInput
                    ? <p className='loading-page'>Loading</p> : <WeatherResult weather={this.state.Weather} forcast={this.state.Forcast} getDate={this.getDate} />

                }

                {/* {weather ? weather : <p>invalid input</p>} */}



                <Link
                    className='button'
                    to='/'
                    onClick={() => this.handleReset()}>
                    Reset
                        </Link>            </div>
        );
    }
}


export default Forcast;
export { Day };