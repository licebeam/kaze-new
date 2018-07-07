import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import KazeContainer from './KazeContainer.jsx';
import LogIn from './LogIn.jsx';
import DeckPage from './deckselect/DeckPage';
import { router } from 'sw-toolbox';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import firebaseui from 'firebaseui';
import firebase from 'firebase';
import Header from './components/Header';
import Footer from './components/Footer';

var config = {

};

firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
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
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
let db = firebase.firestore();

class MainContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentDeck: [],
      deckList: [],
      cardList: [{}],
      currentCard: [],
    }
  }

  getDecks = () => { //gets all decks by group
    const deckIterator = [];
    db.collection("cards")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deckIterator.push({ name: doc.data().group })
          deckIterator !== [] ? this.setState({ deckList: deckIterator }) : null;
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  getCards = (deck_name) => { //gets all cards by group name 
    const cardIterator = [];
    db.collection("cards").where('group', '==', deck_name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cardIterator.push({ kana: doc.data().kana }) //append by kana 
          cardIterator !== [] ? this.setState({ cardList: cardIterator }) : null;
          console.log(this.state.cardList)
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  changeDeck = (title) => {

  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" render={() =>
            <LogIn
              getDecks={this.getDecks}
            />}
          />
          <Route exact path="/Decks" render={() =>
            <DeckPage
              deckList={this.state.deckList}
              currentDeck={this.state.currentDeck}
              getCards={this.getCards}
            />}
          />
          <Route exact path="/Home" component={KazeContainer} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainContainer;
