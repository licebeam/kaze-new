import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import KazeBody from './components/KazeBody';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const propTypes = {
  getDeck: PropTypes.func,
}
const Container = styled.div`
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #fff;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
`
class LogIn extends Component {
  render() {
    const {
      getDecks,
      uiConfig,
      firebaseAuth,
    } = this.props;
    return (
      <Container>
        <h1>Kaze App test</h1>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        <div>
          <button>
            <Link to='/Decks'>
              Continue without logging in?
            </Link>
          </button>
        </div>
      </Container >
    );
  }
}
LogIn.propTypes = this.PropTypes;
export default LogIn;
