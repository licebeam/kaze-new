import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
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
}
const Container = styled.div`
  overflow-x: hidden;
  background-color: #fff;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  .auth-container {
    background-color: #fff;
  }
  .top-bar{
    margin: 0 auto;
    background-color: #fff;
    color: black;
    height: 60px;
    width: 100%;
    padding-bottom: 20px;
  }
  a{
    color: #fff;
    text-decoration: none;
    &:hover{
      color: #EDAD1E;
    }
  }
`
class LogIn extends Component {
  render() {
    const {
      uiConfig,
      firebaseAuth,
    } = this.props;
    return (
      <Container>
        <div className="top-bar" >
          <h1>Log In</h1>
        </div>
        <div className="auth-container">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </Container >
    );
  }
}
LogIn.propTypes = this.PropTypes;
export default LogIn;
