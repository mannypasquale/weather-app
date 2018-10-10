import React, { Component } from 'react'; 
import { Link } from 'react-router-dom';

class Search extends Component {
    render() {
        return (
            <div className='search-component'>
            <div>
            <input
                        className='input-field'
                        id='location'
                        placeholder='St. George, Utah'
                        type='text'
                        value={this.props.children}
                        autoComplete='off'
                        onChange={this.props.children}
                    />
                        
                </div>
                <div className='but'>
                <Link
                            className='button'
                            to={{
                                pathname: '/forcast',
                                search: `${this.props.children ? "?q=" + this.props.children : "INVALID"}` 
                            }}
                            
                            >
                            Get Weather
                            
                </Link>
                </div>
                        </div>
        )
    }
}
export default Search;