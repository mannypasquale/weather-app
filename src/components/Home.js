import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Nav extends Component {
    state = {
        ChosenLocation: ''
        
    }
    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => {
            return {ChosenLocation: value};
        })
    }
    

    render() {
        return (
            <div className='nav'>
                <Link className='header' to='/'>
                    WEATHER!!!
                </Link>
                <div>
                <input
                        className='nav-input-field'
                        id='location'
                        placeholder='Victoria, CA'
                        value={this.state.ChosenLocation}
                        type='text'
                        onFocus="this.value=''"
                        autoComplete='off'
                        
                        onChange={this.handleChange}
                    />
                
                       <Link
                            className='nav-button'
                            to={{
                                pathname: '/forcast',
                                search: `${this.state.ChosenLocation ? "?q=" + this.state.ChosenLocation : "INVALID"}` 
                            }}
                            
                            >
                            Get Weather
                            
                        </Link> 
                
                        </div>
                        </div>
        );
    }
}

class Home extends Component {
    state = {
        ChosenLocation: '',
        
    }
    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => {
            return {ChosenLocation: value};
        })
    }

    // handleSubmit = (event) => {
        
    //     console.log(this);
    //     this.setState(() => ({
    //         ChosenLocation: location
           
    //   }));
        
        
    // }
    
    render() {
        const location = this.state.ChosenLocation;
        



        
        return (
            
            <div>
            <Nav />
            <div className='home-container'>
            <div className='home-container-inner'>
                <h3>
                    Enter a City and Country Code
                </h3>
                <div className='location-container'>
                    <input
                        className='input-field'
                        id='location'
                        placeholder='Victoria, CA'
                        type='text'
                        value={location}
                        autoComplete='off'
                        onChange={this.handleChange}
                    />
                        
                </div>
                <div className='but'>
                <Link
                            className='button'
                            to={{
                                pathname: '/forcast',
                                search: `${location ? "?q=" + location : "INVALID"}` 
                            }}
                            
                            >
                            Get Weather
                            
                        </Link>
                        </div>
            </div>
            </div>
            </div>
        );
    }
}

export default Home;
export {Nav};