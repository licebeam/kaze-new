import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import KazeContainer from './KazeContainer.jsx';
import LogIn from './LogIn.jsx';
import { router } from 'sw-toolbox';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import firebaseui from 'firebaseui'
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyC9kgL1DXJ-rjmVq7J6ghqofptEFajpb_0",
  authDomain: "kazeapp.firebaseapp.com",
  databaseURL: "https://kazeapp.firebaseio.com",
  projectId: "kazeapp",
  storageBucket: "kazeapp.appspot.com",
  messagingSenderId: "92317655588"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
callbacks: {
  signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    return true;
  },
  uiShown: function() {
    // The widget is rendered.
    // Hide the loader.
    document.getElementById('loader').style.display = 'none';
  }
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'popup',
signInSuccessUrl: '/Home',
signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
],
// Terms of service url.
tosUrl: '<your-tos-url>'
};
// The start method will wait until the DOM is loaded
ui.start('#firebaseui-auth-container', uiConfig);
class MainContainer extends Component {
  constructor(props){
    super(props)
    let db = firebase.firestore();
    console.log(db);
  }
  render() {
    return (
      <Router>  
        <div>
    <Route exact path="/" render={()=><LogIn db={this.db}/>}/>
        <Route exact path="/Home" component={KazeContainer}/>
        </div>
      </Router>
    );
  }
}

export default MainContainer;
