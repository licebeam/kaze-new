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
  deckList: PropTypes.array,
  getCards: PropTypes.func,
  getDecks: PropTypes.func,
};

const Deck = styled.div`
height: 100px; 
width: 100%;
background-color: #4472C4; 
  &:hover {
  background-color: #4472C4;
  }
`
const Container = styled.div`
  overflow-x: hidden;
  background-color: #4472C4;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
`
class DeckPage extends Component {

  render() {
    const { getCards, getDecks } = this.props;
    return (
      <Container>
        <h1>Select Deck</h1>
        {this.props.deckList.map(deck => {
          return (
            <Deck getCards={this.getCards}>
              <h2 key='deckName'>{deck.name}</h2>
              <button onClick={() => {
                getCards(deck.name);
              }}>
                <Link to='/Home'>
                  Select Deck
              </Link>
              </button>
            </Deck>
          )
        })}
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
