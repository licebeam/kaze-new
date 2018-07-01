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

const propTypes = {
  dbadd: PropTypes.func,
}
const Container = styled.div `
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #eee;
  height: 100vh;
`
class LogIn extends Component {
  render() {
   const {dbadd} =  this.props;
    return (
      <Container>
        <h1>Kaze App test</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        <div>
          <button dbadd={dbadd} onClick={() => {
            dbadd();
            console.log(dbadd)
          }}>
            <Link to='/Home'>
              Continue without logging in?
            </Link>
          </button>
        </div>
      </Container>
    );
  }
}
LogIn.propTypes = this.PropTypes;
export default LogIn;
