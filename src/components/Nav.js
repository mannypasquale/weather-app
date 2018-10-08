import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import LocationInput from './LocationInput';

class Nav extends Component {
    render() {
        return (
            <div className='nav'>
                <Link className='header' to='/'>
                    Manny's React-Weather-App
                </Link>
            </div>
        );
    }
}


export default Nav;