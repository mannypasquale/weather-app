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
                    Manny's React-Weather-App
                </Link>
                <div>
                <input
                        className='nav-input-field'
                        id='location'
                        placeholder='St. George, Utah'
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


export default Nav;