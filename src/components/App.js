import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home';
import Forcast from './Forcast';
import Nav from './Nav';
import '../App.css';
import '../index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/forcast' component={Forcast} />
          </Switch>
        </div>
      </Router>
        
        
        
      
    );
  }
}

export default App;
