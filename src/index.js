import React from 'react';
import ReactDOM from 'react-dom';
import KazeContainer from './KazeContainer';
import LogIn from './LogIn';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { router } from 'sw-toolbox';


ReactDOM.render(
<Router>  
  <div>
  <Route exact path="/" component={LogIn}/>
  <Route exact path="/Home" component={KazeContainer}/>
  </div>
</Router>, document.getElementById('root'));

