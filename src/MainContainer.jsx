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
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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
// var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/Decks',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};
// The start method will wait until the DOM is loaded

// ui.start('#firebaseui-auth-container', uiConfig);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
var db = firebase.firestore();

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
      //user state
      userHandle: '',
      userEmail: '',
      userPhoto: '',
      userUid: '',
      userProviderData: '',

    }
  }
  componentDidMount() {
    this.getDecks();
    this.logInSet();
  }

  logInSet = () => {
    const { userHandle } = this.state;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('user is signed in')
        this.setState({ userHandle: user.displayName })
        this.setState({ userEmail: user.email })
        this.setState({ userPhoto: user.photoURL })
        this.setState({ userUid: user.uid })
        this.setState({ userProviderData: user.providerData })
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
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
          <Header
            userHandle={this.state.userHandle}
            userPhoto={this.state.userPhoto}
          />
          <Route exact path="/" render={() =>
            <LogIn
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />}
          />
          <Route exact path="/Decks" render={() =>
            <DeckPage
              deckList={this.state.deckList}
              currentDeck={this.state.currentDeck}
              getCards={this.getCards}
              getDecks={this.getDecks}
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
