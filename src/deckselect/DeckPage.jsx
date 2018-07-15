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
color: #000;
text-align: left;
background-color: #EDAD1E; 
  &:hover {
  background-color: #21A4D3;
  }
h2 {
  padding-left: 20px;
}
`
const Container = styled.div`
  overflow-x: hidden;
  /* background-color: #21A4D3; */
  background-color: #21A4D3;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
  display: flex; 
  flex-direction: column;
  align-content: center;
  text-align: center;
  h1 {
    color: #fff;
  }
  button { 
    border: none;
    background: none;
  }
   a{
    text-decoration: none;
    color: #fff;
    &:hover{
      color: #048CAC;
    }
  }
   .top-bar{
    margin: 0 auto;
    background-color: #145674;
    height: 60px;
    width: 100%;
    padding-bottom: 20px;
  } 
`
class DeckPage extends Component {

  render() {
    const { getCards, getDecks } = this.props;
    return (
      <Container>
        <div className="top-bar" >
          <h1>Select Deck</h1>
        </div>
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
        <div>
          <Link to='/'>
            Back To Login
          </Link>
        </div>
      </Container>
    );
  }
}
DeckPage.propTypes = this.PropTypes;
export default DeckPage;
