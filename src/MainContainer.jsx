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


//STYLED COMPONENTS 
const Container = styled.div`
  background-color: #fff;
  display: flex;
`
const Section = styled.div`
  background-color: #fff;
  flex: 2;
  background: url(${props => props.bodyImage});
  background-size: 100%;
  background-size:cover;
  height: 80vh;
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
  font-size: 1.2rem;
  img{
    margin-top: 20px;
  }
  .title{
    font-size: .8rem;
  }
  .links{
    margin-top: 20px;
    font-size: .8rem;
  }
  button{
    width: 100px;
    height: 40px;
    margin-top: 20px;
    font-size: 3rem;
    background:none;
    border: none;
    color:${props => props.songPlaying ? 'black' : '#F53240'};
    &:hover{
      color:  #F53240;
    }
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
    height: 150px;
    width: 150px;
    border-radius: 50%;
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
      currentTrack: '',
      currentSetLength: 0,
      //SYNCING
      currentTrackTime: 0,
      trackSynced: false,
      //CONTROLS
      songPlaying: true,
    }
  }

  componentDidMount() {
    this.logInSet();
    setInterval(() => {
      if (document.querySelector('iframe')) {
        var SC = SC || {}; SC.Widget = function (n) { function t(r) { if (e[r]) return e[r].exports; var o = e[r] = { exports: {}, id: r, loaded: !1 }; return n[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports } var e = {}; return t.m = n, t.c = e, t.p = "", t(0) }([function (n, t, e) { function r(n) { return !!("" === n || n && n.charCodeAt && n.substr) } function o(n) { return !!(n && n.constructor && n.call && n.apply) } function i(n) { return !(!n || 1 !== n.nodeType || "IFRAME" !== n.nodeName.toUpperCase()) } function a(n) { var t, e = !1; for (t in b) if (b.hasOwnProperty(t) && b[t] === n) { e = !0; break } return e } function s(n) { var t, e, r; for (t = 0, e = I.length; t < e && (r = n(I[t]), r !== !1); t++); } function u(n) { var t, e, r, o = ""; for ("//" === n.substr(0, 2) && (n = window.location.protocol + n), r = n.split("/"), t = 0, e = r.length; t < e && t < 3; t++)o += r[t], t < 2 && (o += "/"); return o } function c(n) { return n.contentWindow ? n.contentWindow : n.contentDocument && "parentWindow" in n.contentDocument ? n.contentDocument.parentWindow : null } function l(n) { var t, e = []; for (t in n) n.hasOwnProperty(t) && e.push(n[t]); return e } function d(n, t, e) { e.callbacks[n] = e.callbacks[n] || [], e.callbacks[n].push(t) } function E(n, t) { var e, r = !0; return t.callbacks[n] = [], s(function (t) { if (e = t.callbacks[n] || [], e.length) return r = !1, !1 }), r } function f(n, t, e) { var r, o, i = c(e); return !!i.postMessage && (r = e.getAttribute("src").split("?")[0], o = JSON.stringify({ method: n, value: t }), "//" === r.substr(0, 2) && (r = window.location.protocol + r), r = r.replace(/http:\/\/(w|wt).soundcloud.com/, "https://$1.soundcloud.com"), void i.postMessage(o, r)) } function p(n) { var t; return s(function (e) { if (e.instance === n) return t = e, !1 }), t } function h(n) { var t; return s(function (e) { if (c(e.element) === n) return t = e, !1 }), t } function v(n, t) { return function (e) { var r = o(e), i = p(this), a = !r && t ? e : null, s = r && !t ? e : null; return s && d(n, s, i), f(n, a, i.element), this } } function S(n, t, e) { var r, o, i; for (r = 0, o = t.length; r < o; r++)i = t[r], n[i] = v(i, e) } function R(n, t, e) { return n + "?url=" + t + "&" + g(e) } function g(n) { var t, e, r = []; for (t in n) n.hasOwnProperty(t) && (e = n[t], r.push(t + "=" + ("start_track" === t ? parseInt(e, 10) : e ? "true" : "false"))); return r.join("&") } function m(n, t, e) { var r, o, i = n.callbacks[t] || []; for (r = 0, o = i.length; r < o; r++)i[r].apply(n.instance, e); (a(t) || t === L.READY) && (n.callbacks[t] = []) } function w(n) { var t, e, r, o, i; try { e = JSON.parse(n.data) } catch (a) { return !1 } return t = h(n.source), r = e.method, o = e.value, (!t || A(n.origin) === A(t.domain)) && (t ? (r === L.READY && (t.isReady = !0, m(t, C), E(C, t)), r !== L.PLAY || t.playEventFired || (t.playEventFired = !0), r !== L.PLAY_PROGRESS || t.playEventFired || (t.playEventFired = !0, m(t, L.PLAY, [o])), i = [], void 0 !== o && i.push(o), void m(t, r, i)) : (r === L.READY && T.push(n.source), !1)) } function A(n) { return n.replace(Y, "") } var _, y, O, D = e(1), b = e(2), P = e(3), L = D.api, N = D.bridge, T = [], I = [], C = "__LATE_BINDING__", k = "http://wt.soundcloud.test:9200/", Y = /^http(?:s?)/; window.addEventListener ? window.addEventListener("message", w, !1) : window.attachEvent("onmessage", w), n.exports = O = function (n, t, e) { if (r(n) && (n = document.getElementById(n)), !i(n)) throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element."); t && (e = e || {}, n.src = R(k, t, e)); var o, a, s = h(c(n)); return s && s.instance ? s.instance : (o = T.indexOf(c(n)) > -1, a = new _(n), I.push(new y(a, n, o)), a) }, O.Events = L, window.SC = window.SC || {}, window.SC.Widget = O, y = function (n, t, e) { this.instance = n, this.element = t, this.domain = u(t.getAttribute("src")), this.isReady = !!e, this.callbacks = {} }, _ = function () { }, _.prototype = { constructor: _, load: function (n, t) { if (n) { t = t || {}; var e = this, r = p(this), o = r.element, i = o.src, a = i.substr(0, i.indexOf("?")); r.isReady = !1, r.playEventFired = !1, o.onload = function () { e.bind(L.READY, function () { var n, e = r.callbacks; for (n in e) e.hasOwnProperty(n) && n !== L.READY && f(N.ADD_LISTENER, n, r.element); t.callback && t.callback() }) }, o.src = R(a, n, t) } }, bind: function (n, t) { var e = this, r = p(this); return r && r.element && (n === L.READY && r.isReady ? setTimeout(t, 1) : r.isReady ? (d(n, t, r), f(N.ADD_LISTENER, n, r.element)) : d(C, function () { e.bind(n, t) }, r)), this }, unbind: function (n) { var t, e = p(this); e && e.element && (t = E(n, e), n !== L.READY && t && f(N.REMOVE_LISTENER, n, e.element)) } }, S(_.prototype, l(b)), S(_.prototype, l(P), !0) }, function (n, t) { t.api = { LOAD_PROGRESS: "loadProgress", PLAY_PROGRESS: "playProgress", PLAY: "play", PAUSE: "pause", FINISH: "finish", SEEK: "seek", READY: "ready", OPEN_SHARE_PANEL: "sharePanelOpened", CLICK_DOWNLOAD: "downloadClicked", CLICK_BUY: "buyClicked", ERROR: "error" }, t.bridge = { REMOVE_LISTENER: "removeEventListener", ADD_LISTENER: "addEventListener" } }, function (n, t) { n.exports = { GET_VOLUME: "getVolume", GET_DURATION: "getDuration", GET_POSITION: "getPosition", GET_SOUNDS: "getSounds", GET_CURRENT_SOUND: "getCurrentSound", GET_CURRENT_SOUND_INDEX: "getCurrentSoundIndex", IS_PAUSED: "isPaused" } }, function (n, t) { n.exports = { PLAY: "play", PAUSE: "pause", TOGGLE: "toggle", SEEK_TO: "seekTo", SET_VOLUME: "setVolume", NEXT: "next", PREV: "prev", SKIP: "skip" } }]);
        var iframeElement = document.querySelector('iframe');
        var widget = SC.Widget(iframeElement);
        this.setState({ audio: widget })

        if (this.state.userUid === "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
          //GETS THE CURRENT TRACK TIME FOR UPDATE
          this.state.audio.getPosition((e) => { this.setState({ currentTrackTime: e }) })

          this.state.audio.getSounds((e) => {
            this.setState({ currentSetLength: e.length })
            // console.log(this.state.currentSetLength)
          })
          this.state.audio.getCurrentSoundIndex((e) => {
            this.setState({ currentTrack: e }
            )
          })
        }
        //get track time for user
        if (this.state.userUid !== "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
          //GETS THE CURRENT TRACK TIME FOR UPDATE
          console.log('user track time')
          this.state.audio.getPosition((e) => { this.setState({ currentTrackTime: e }) })
        }
        //RESET TRACKLIST AT END
        if (this.state.userUid === "TVsxMOD656ZfuK3aNJtLBrEUfh12" && this.state.currentTrack >= this.state.currentSetLength - 1) {
          this.state.audio.skip(0);
        }

        this.state.audio.getCurrentSound((e) => { this.setState({ currentSound: e }) });

        if (this.state.userUid === "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
          this.state.audio.getCurrentSoundIndex((e) => { this.setState({ currentTrack: e }) })
        }

        //CHECK WHICH TRACK WE ARE ON
        if (this.state.currentSound.title != this.state.artistTitle) {
          this.updateInformation()
          this.getSongInfo()
          this.setState({ bodyImage: bodyImages[this.getRandomInt(bodyImages.length)] })
        }

        //SYNCE THE TRACK ON PAUSE AND LOAD ONE TIME
        //skip to correct track

        if (this.state.currentTrack !== 0) {
          // this.getSongInfo()
          // this.state.audio.skip(this.state.currentTrack);
        }
        //skip to correct time once per song/load
        if (this.state.currentSound.title === this.state.artistTitle && this.state.userUid !== "TVsxMOD656ZfuK3aNJtLBrEUfh12") {

        }

      }
    }, 3000);
    setInterval(() => {
      console.log("CHECK TRACK TIMES")
      if (this.state.userUid === "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
        this.updateInformation()
      }
      if (this.state.userUid !== "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
        this.updateInformation()
        this.getSongInfo()
      }
      //check and update the trackTime for admin every minute
    }, 60000);
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

  updateInformation = () => {
    if (this.state.userUid === "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
      console.log(this.state.userUid)
      console.log('updating song info')
      db.collection('songs').doc('track')
        .update({
          songInfo: this.state.currentSound,
          currentTrack: this.state.currentTrack,
          currentTrackTime: this.state.currentTrackTime
        })
        .then(() => {
          // console.log(userDeck)
          // console.log('updated songInfo', this.state.currentSound)
        })
        .catch((error) => {
          console.log('there was an error updating user song')
        })
    } else console.log('not admin')
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getSongInfo = () => { //gets all decks by group
    db.collection("songs")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log('gettingdata', doc.data())
          const data = doc.data();
          this.setState({ artistArt: data.songInfo.artwork_url })
          this.setState({ artistName: data.songInfo.user.username })
          this.setState({ artistTitle: data.songInfo.title })
          this.setState({ artistLinkSoundcloud: data.songInfo.user.permalink_url })
          this.setState({ artistLinkBandcamp: data.songInfo.purchase_url })
          this.setState({ currentTrack: data.currentTrack })
          if (this.state.currentTrackTime !== data.currentTrackTime && this.state.userUid !== "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
            this.setState({ currentTrackTime: data.currentTrackTime })
            this.state.audio.seekTo(this.state.currentTrackTime)
            console.log("TRACK TIME SET", this.state.currentTrackTime)
          }

          // console.log(this.state.artistArt)
          if (this.state.userUid !== "TVsxMOD656ZfuK3aNJtLBrEUfh12") {
            console.log('skipping track')
            this.state.audio.skip(data.currentTrack)
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
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
          <Route exact path="/Home" render={() =>
            <Container>
              <SectionPlayer songPlaying={this.state.songPlaying} audio={this.state.audio}>
                <iframe width="100%" height="0" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/584897883&color=%23274769&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
                </iframe>

                <ArtistContainer>
                  {this.state.artistName}
                  <img src={this.state.artistArt ? this.state.artistArt : 'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'} />
                  <div className="title">
                    {this.state.artistTitle}
                  </div>
                  <div className="links">
                    <a href={this.state.artistLinkSoundcloud}>{this.state.artistLinkSoundcloud ? "SoundCloud" : ''}</a>
                    <br />
                    <a href={this.state.artistLinkBandcamp}>{this.state.artistLinkBandcamp ? "BandCamp" : ''}</a>
                  </div>
                  <div class="controls">
                    <button onClick={() => {
                      if (this.state.songPlaying === false) {
                        console.log('playing')
                        this.state.audio.play();
                        this.setState({ songPlaying: true })
                      } else if (this.state.songPlaying) {
                        this.state.audio.pause(),
                          this.setState({ songPlaying: false })
                      }
                    }}>&#x3e;</button>
                  </div>
                </ArtistContainer>
              </SectionPlayer>
              {/* <button

                onClick={() => {
                  this.state.audio.toggle();
                  this.state.audio.getCurrentSound((e) => { this.setState({ currentSound: e }) });
                  this.setState({ art: this.state.currentSound.artwork_url })
                  // this.setState({ audio: false })
                }}>Pause Audio</button> */}
              <Section bodyImage={this.state.bodyImage}>

              </Section>
              {/* <SectionLogin>
                Live Chat Coming Soon
                No need to log in yet.
                <LogIn
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </SectionLogin> */}
            </Container>
          }
          />
          < Route exact path="/Profile" render={() =>
            <UserProfile
              userEmail={this.state.userEmail}
              userHandle={this.state.userHandle}
              userPhoto={this.state.userPhoto}
            />}
          />
          < Footer />
        </div >
      </Router >
    );
  }
}

export default MainContainer;
