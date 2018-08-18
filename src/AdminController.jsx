import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
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

var bodyImages = [
  "https://i.pinimg.com/originals/98/ba/4c/98ba4c2fdb2add2645eb9943adeb8fa1.gif",
  "http://gifimage.net/wp-content/uploads/2018/06/vaporwave-gif.gif",
  "https://thumbs.gfycat.com/OfficialSkeletalArrowcrab-size_restricted.gif",
  "https://static.tumblr.com/f39d9cf23b76436897bf8f30c5907149/g1wmm1e/njqog600a/tumblr_static_tumblr_static_8zvmg4u2ymg40w88444s88kkk_640.gif"
]


//STYLED COMPONENTS 
const Container = styled.div`
  background-color: brown;
  display: flex;
`
const Section = styled.div`
  background-color: green;
  flex: 2;
  background: url(${props => props.bodyImage});
  /* background-size: 100%; */
  background-size:cover;
`
const SectionLogin = styled.div`
  background-color: #fff;
  flex: 1;
`
const SectionPlayer = styled.div`
  background-color: #fff;
  flex: .5;
  padding: 20px;
  visibility: ${props => props.audio ? 'visible' : 'hidden'};
  text-align: center;
  img{
    margin-top: 20px;
  }
  .title{
    font-size: .8rem;
  }
  .links{
    margin-top: 20px;
  }
`
const ArtistContainer = styled.div`
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;

  img{
    margin-bottom: 20px;
    height: 120px;
    width: 120px;
    border-radius: 50%;
    border: 2px solid #000;
  }
`

//
class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bodyImage: '',
      totalPlaylistTime: '',
      updatedTime: '',
      audio: true,
      art: '',
      currentSound: '',
      artistName: '',
      artistArt: '',
      songTitle: '',
      artistTitle: '',
      artistLinkSoundcloud: '',
      artistLinkBandcamp: '',
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.props.setSongSetInfo();
    }, 1000);


  }

  logInSet = () => {
    const { userHandle } = this.state;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.db.collection('users').doc(user.email)
          .update({ userEmail: user.email })
          .then(() => {
            console.log('updating user')
          })
          .catch((error) => {
            console.log('error, user does not exist')
            this.props.db.collection('users').doc(user.email)
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

  // updateInformation = () => {
  //   this.props.db.collection('songs').doc('track')
  //     .update({
  //       songInfo: this.state.currentSound
  //     })
  //     .then(() => {
  //       // console.log(userDeck)
  //       // console.log('updated songInfo', this.state.currentSound)
  //     })
  //     .catch((error) => {
  //       console.log('there was an error updating user song')
  //     })
  // }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  // getSongInfo = () => { //gets all decks by group
  //   this.props.db.collection("songs")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log('gettingdata', doc.data())
  //         const data = doc.data();
  //         this.setState({ artistArt: data.songInfo.artwork_url })
  //         this.setState({ artistName: data.songInfo.user.username })
  //         this.setState({ artistTitle: data.songInfo.title })
  //         this.setState({ artistLinkSoundcloud: data.songInfo.user.permalink_url })
  //         this.setState({ artistLinkBandcamp: data.songInfo.purchase_url })
  //         console.log(this.state.artistArt)
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log("Error getting documents: ", error);
  //     });
  // }

  render() {
    const { db, updateInformation, getSongInfo, setSongSetInfo,
    } = this.props
    return (
      <Router>
        <div>
          <Route exact path="/Admin" render={() =>
            <Container>
              <SectionPlayer audio={this.state.audio}>
                <iframe width="100%" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/584897883&color=%23274769&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
                </iframe>
                <ArtistContainer>
                  {this.state.artistName}
                  <img src={this.state.artistArt} />
                  <div className="title">
                    {this.state.artistTitle}
                  </div>
                  <div className="links">
                    <a href={this.state.artistLinkSoundcloud}>{this.state.artistLinkSoundcloud ? "SoundCloud" : ''}</a>
                    <br />
                    <a href={this.state.artistLinkBandcamp}>{this.state.artistLinkBandcamp ? "BandCamp" : ''}</a>
                  </div>
                </ArtistContainer>
              </SectionPlayer>
              <Section bodyImage={this.state.bodyImage}>

              </Section>

            </Container>
          }
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default MainContainer;
