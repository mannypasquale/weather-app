import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

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
            <div className='home-container'>
                <h3>
                    Enter a City and State
                </h3>
                <div className='location-container'>
                    <input
                        className='input-field'
                        id='location'
                        placeholder='St. George, Utah'
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
        );
    }
}

export default Home;