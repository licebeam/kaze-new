import React from 'react';
import ReactDOM from 'react-dom';
import KazeContainer from './KazeContainer';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { router } from 'sw-toolbox';


ReactDOM.render(
<Router>  
  <KazeContainer />
</Router>, document.getElementById('root'));

