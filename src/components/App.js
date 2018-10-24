import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home';
import Forcast from './Forcast';
import { Day } from './Forcast';
import '../App.css';
import '../index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/forcast' component={Forcast} />
            <Route path='/forcast/day' component={Day} />
            <Route render={function () {
              return <p> Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>




    );
  }
}

export default App;
