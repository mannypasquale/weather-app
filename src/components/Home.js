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

    handleSubmit = (event) => {
        let x = this.state.ChosenLocation.split(',');
        console.log(this);
        this.setState(() => ({
            ChosenLocation: "fuck"
           
      }));
        
        
    }
    
    render() {
        const location = this.state.ChosenLocation;
        



        
        return (
            <div className='home-container'>
                <h3>
                    Enter a City and State
                </h3>
                <div className='location-container'>
                <form className='search-block'>
                    <input
                        id='location'
                        placeholder='St. George, Utah'
                        type='text'
                        value={location}
                        autoComplete='off'
                        onChange={this.handleChange}
                    />
                        <Link
                            className='button'
                            onClick={() => this.handleSubmit()}
                            to={{
                                pathname: '/forcast',
                                search: `?q=${location}`
                            }}
                            
                            >
                            
                            Get Weather
                        </Link>
                    
                </form>
                

                </div>
            </div>
        );
    }
}

export default Home;