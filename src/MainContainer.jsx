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
  apiKey: "AIzaSyC9kgL1DXJ-rjmVq7J6ghqofptEFajpb_0",
  authDomain: "kazeapp.firebaseapp.com",
  databaseURL: "https://kazeapp.firebaseio.com",
  projectId: "kazeapp",
  storageBucket: "kazeapp.appspot.com",
  messagingSenderId: "92317655588",
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
  signInSuccessUrl: '/Decks',
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
          cardIterator.push({ cards: doc.data().card }) //append by kana 
          cardIterator !== [] ? this.setState({ cardList: cardIterator }) : null;
          console.log(this.state.cardList);
          this.setState({ currentDeck: deck_name });
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
          <Route exact path="/Home" render={() =>
            <KazeContainer
              cardList={this.state.cardList}
              currentDeck={this.state.currentDeck}
              currentCard={this.state.currentCard}
            />}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainContainer;
