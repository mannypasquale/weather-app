import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import LocationInput from './LocationInput';
import Search from './Search';

class Nav extends Component {
    state = {
        ChosenLocation: '',
        
    }
    handleChange = (event) => {
        const value = event.target.value;
        this.setState(() => {
            return {ChosenLocation: value};
        })
    }
    render() {
        const location = this.state.ChosenLocation;
        return (
            <div className='nav'>
                <Link className='header' to='/'>
                    Manny's React-Weather-App
                </Link>
                <div>
                <input
                        className='nav-input-field'
                        id='location'
                        placeholder='St. George, Utah'
                        type='text'
                        value={location}
                        autoComplete='off'
                        onChange={this.handleChange}
                    />
                       <Link
                            className='nav-button'
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


export default Nav;