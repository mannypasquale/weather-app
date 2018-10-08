import React, {Component} from 'react';


class LocationInput extends Component {
    state = {
        location: ''
    }

    handleChange = (event) => {
        const value = event.target.value;

        this.setState(() => {
            return {location: value};
        })
    }

    handleSubmit = (event) => {
        console.log("hit that handle submit");
        event.preventDefault();

        

    }
    render() {
        const location = this.state.location;
        return (
                <form className='search-block' onSubmit={this.handleSubmit}>
                    <input
                        id='location'
                        placeholder='St. George, Utah'
                        type='text'
                        value={location}
                        autoComplete='off'
                        onChange={this.handleChange}
                    />
                    <input type='submit' value="Submit" />
                    
                </form>
        );
    }   
}

export default LocationInput;