import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LogIn from './LogIn.jsx';
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
import UserProfile from './userprofile/UserProfile'

var config = {
  apiKey: "AIzaSyC9kgL1DXJ-rjmVq7J6ghqofptEFajpb_0", //NEEDS TO CHANGE
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
  signInSuccessUrl: '/Home',
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

    }
  }
  componentDidMount() {
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
                userMemorized: 0,
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

  // getDecks = () => { //gets all decks by group
  //   const deckIterator = [];
  //   db.collection("cards")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         deckIterator.push({ name: doc.data().group })
  //         deckIterator !== [] ? this.setState({ deckList: deckIterator }) : null;
  //       });
  //       this.getUserDecksFromDb();
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting documents: ", error);
  //     });
  // }

  // getCards = (deck_name) => { //gets all cards by group name 
  //   this.setState({ currentDeck: [] });
  //   this.setState({ currentCard: [] });
  //   this.setState({ cardList: [] });
  //   const cardIterator = [];
  //   db.collection("cards").where('group', '==', deck_name)
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         cardIterator.push({ cards: doc.data().card }) //append by kana 
  //         cardIterator !== [] ? this.setState({ cardList: cardIterator }) : null;
  //         // console.log(this.state.cardList);
  //         this.setState({ currentDeck: deck_name });
  //         this.setState({ currentCard: this.state.cardList[0].cards[0] })
  //         this.getRating(this.state.currentCard.id);
  //         // console.log(this.state.currentCard)
  //         // console.log("user deck ", this.state.userDeck)
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting documents: ", error);
  //     });
  // }

  //add and update user card database
  //   db.collection('users').doc(this.state.userEmail)
  //   .update({
  //     userDecks: userDeck,
  //     userMemorized: this.state.cardsMemorized
  //   })
  //   .then(() => {
  //   // console.log(userDeck)
  //   console.log('updated userDeck')
  //   this.updateCard(this.state.currentCard.id);
  //   this.getRating(this.state.currentCard.id);
  // })
  //   .catch ((error) => {
  //   console.log('there was an error updating user deck')
  // })
  //   }


  // memorizeCard = () => {
  //   this.setState({ cardsMemorized: this.state.cardsMemorized + 1 })
  // }

  render() {

    return (
      <Router>
        <div>
          <Header
            userHandle={this.state.userHandle}
            userPhoto={this.state.userPhoto}
          />
          <Route exact path="/Home" render={() =>
            <div>
              <div>
                BLAH BLAH BLAH
            </div>
              <div>
                BLAH BLAH BLAH
            </div>
              <LogIn
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          }
          />
          <Route exact path="/Profile" render={() =>
            <UserProfile
              userEmail={this.state.userEmail}
              userHandle={this.state.userHandle}
              userPhoto={this.state.userPhoto}
            />}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainContainer;
