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
  overflow-x: hidden;
  background-color: #4472C4;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  .top-bar{
    margin: 0 auto;
    background-color: #fff;
    height: 60px;
    width: 100%;
    padding-bottom: 20px;
  }
  a{
    color: #fff;
    &:hover{
      color: #EDAD1E;
    }
  }
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
        <div className="top-bar" >
          <h1>Log In</h1>
        </div>
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
        <div>
          <Link to='/Decks'>
            Continue without logging in?
          </Link>
        </div>
      </Container >
    );
  }
}
LogIn.propTypes = this.PropTypes;
export default LogIn;
