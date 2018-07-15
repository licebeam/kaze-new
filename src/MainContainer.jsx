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
      userDeck: [],
      currentRating: null,
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
        db.collection('users').doc(user.email)
          .update({ userEmail: user.email })
          .then(() => {
            console.log('updating user')
          })
          .catch((error) => {
            console.log('error, user does not exist')
            db.collection('users').doc(user.email)
              .set({
                userEmail: user.email,
                userDecks: [],
              })
              .then(() => {
                console.log('added user to db and updating')
              })
              .catch((error) => {
                console.log('error adding user')
              })
          })
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
        this.getUserDecksFromDb();
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  getCards = (deck_name) => { //gets all cards by group name 
    this.setState({ currentDeck: [] });
    this.setState({ currentCard: [] });
    this.setState({ cardList: [] });
    const cardIterator = [];
    db.collection("cards").where('group', '==', deck_name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cardIterator.push({ cards: doc.data().card }) //append by kana 
          cardIterator !== [] ? this.setState({ cardList: cardIterator }) : null;
          // console.log(this.state.cardList);
          this.setState({ currentDeck: deck_name });
          this.setState({ currentCard: this.state.cardList[0].cards[0] })
          this.getRating(this.state.currentCard.id);
          // console.log(this.state.currentCard)
          // console.log("user deck ", this.state.userDeck)
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
    this.getRating(this.state.currentCard.id);
  }
  prevCard = (cardId) => {
    const curCard = cardId - 1;
    const cards = this.state.cardList[0].cards;
    this.setState({ currentCard: cards[curCard >= 1 ? curCard - 1 : cards.length - 1] })
    this.getRating(this.state.currentCard.id);
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
  getRating = (cardId) => {
    const { userDeck } = this.state
    const curCard = userDeck.find(c => c.card.id === cardId)
    this.setState({ currentRating: curCard && curCard.rating ? curCard.rating : 'No Rating' })
  }

  addToUserDeck = (card, deckname, rating) => {
    const { userDeck } = this.state;
    // console.log(card.id)
    const cardCheck = userDeck.find(c => {
      return c.card.id === card.id;
    })
    const cardIndex = userDeck.indexOf(cardCheck);

    cardCheck && cardCheck.rating === rating
      ? console.log('rating is the same')
      : cardCheck && cardCheck.card ? (
        console.log('delete and re-add card'),
        userDeck.splice(cardIndex, 1),
        this.setState({ userDeck: [...userDeck, { card, deckname, rating }] }))
        : console.log('adding card');

    cardCheck && cardCheck.card
      ? console.log('card exists in deck')
      : this.setState({ userDeck: [...userDeck, { card, deckname, rating }] })


    //add and update user card database
    db.collection('users').doc(this.state.userEmail)
      .update({
        userDecks: userDeck
      })
      .then(() => {
        // console.log(userDeck)
        console.log('updated userDeck')
        this.updateCard(this.state.currentCard.id);
        this.getRating(this.state.currentCard.id);
      })
      .catch((error) => {
        console.log('there was an error updating user deck')
      })
  }

  getUserDecksFromDb = () => {
    const { userDeck } = this.state;
    db.collection("users").where('userEmail', '==', this.state.userEmail)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log("doc data", doc.data().userDecks)
          this.setState({ userDeck: doc.data().userDecks })
        });
      })
      .catch(function (error) {
        console.log("Error getting userDecks: ", error);
      });
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
              addToUserDeck={this.addToUserDeck}
              userDeck={this.state.userDeck}
              getRating={this.getRating}
              currentRating={this.state.currentRating}
            />}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainContainer;
