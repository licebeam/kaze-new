import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const propTypes = {};

const Container = styled.div`
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #eee;
  height: 100vh;
`
class DeckPage extends Component {
  render() {
    return (
      <Container>
        <h1>Select Deck</h1>
        <button>
          <Link to='/Home'>
            Continue without logging in?
          </Link>
        </button>
        <button>
          <Link to='/'>
            Back To Login
          </Link>
        </button>
      </Container>
    );
  }
}
DeckPage.propTypes = this.PropTypes;
export default DeckPage;
