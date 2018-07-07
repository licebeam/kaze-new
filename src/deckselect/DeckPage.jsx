import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from '../components/Header';

const propTypes = {
  currentDeck: PropTypes.string,
  deckList: PropTypes.array,
  getCards: PropTypes.func,
};

const Deck = styled.div`
height: 100px; 
width: 100%;
background-color: red; 
  &:hover {
  background-color: blue;
  }
`
const Container = styled.div`
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #fff;
  height: 100vh;
`
class DeckPage extends Component {
  render() {
    return (
      <Container>
        <h1>Select Deck</h1>
        <button>
          <Link to='/'>
            Back To Login
          </Link>
        </button>
        {this.props.deckList.map(deck => {
          return (
            <Deck>
              <h2 key='deckName'>{deck.name}</h2>
              <button>
                <Link to='/Home'>
                  Continue without logging in?
              </Link>
              </button>
            </Deck>
          )
        })}
      </Container>
    );
  }
}
DeckPage.propTypes = this.PropTypes;
export default DeckPage;
