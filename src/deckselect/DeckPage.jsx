import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Header from '../components/Header';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faChevronRight, faSort } from "@fortawesome/free-solid-svg-icons"
library.add(faClock, faChevronRight, faSort);

const propTypes = {
  deckList: PropTypes.array,
  getCards: PropTypes.func,
  getDecks: PropTypes.func,
};

const Deck = styled.div`
display: flex; 
text-align: center;
align-items: center; 
align-self: center; 
vertical-align: middle;
flex-direction: row;
height: 100px; 
width: 100%;
color: #000;
text-align: left;
background-color: #EDAD1E; 
margin-bottom: 10px;
  &:hover {
  background-color: #EDAD1E;
  }
h2 {
  flex: 1;
  font-size: 1.2rem;
  padding-left: 10px;
}
.select-deck{
  height: 100%;
  background-color: #F53240; 
  flex: 1;
}
.timer-button, .sort-button {
  flex: 1;
  height: 100px;
  width: 100px;
  background-color: #F53240; 
  color: #fff;
  text-align: center;
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
              <button className="sort-button">
                <FontAwesomeIcon icon="sort" size="4x" />
              </button>
              <button className="timer-button">
                <FontAwesomeIcon icon="clock" size="4x" />
              </button>
              <button className='select-deck' onClick={() => {
                getCards(deck.name);
              }}>
                <Link to='/Home'>
                  <FontAwesomeIcon icon="chevron-right" size="4x" />
                </Link>
              </button>
            </Deck>
          )
        })}
        {/* <div>
          <Link to='/'>
            Back To Login
          </Link>
        </div> */}
      </Container>
    );
  }
}
DeckPage.propTypes = this.PropTypes;
export default DeckPage;
