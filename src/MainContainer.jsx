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
      cardList: [],
      currentCard: [],
      cardFlipped: 'front',
      hintShown: false,
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
          this.setState({ currentCard: this.state.cardList[0].cards[0] })
          console.log(this.state.currentCard)
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  updateCard = (cardId) => {
    const curCard = cardId - 1;
    const cards = this.state.cardList[0].cards;
    this.setState({ currentCard: cards[cards.length > curCard + 1 ? curCard + 1 : 0] })
  }
  prevCard = (cardId) => {
    const curCard = cardId - 1;
    const cards = this.state.cardList[0].cards;
    this.setState({ currentCard: cards[curCard >= 1 ? curCard - 1 : cards.length - 1] })
  }

  flipCard = () => {
    const { cardFlipped } = this.state
    cardFlipped === 'front'
      ? this.setState({ cardFlipped: 'back' })
      : this.setState({ cardFlipped: 'front' })
  }

  showHint = () => {
    const { hintShown } = this.state
    hintShown === false
      ? this.setState({ hintShown: true })
      : this.setState({ hintShown: false })
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
              updateCard={this.updateCard}
              prevCard={this.prevCard}
              cardFlipped={this.state.cardFlipped}
              flipCard={this.flipCard}
              hintShown={this.state.hintShown}
              showHint={this.showHint}
            />}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainContainer;
