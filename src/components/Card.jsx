import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faThumbsUp, faThumbsDown, faArrowLeft, faRedo, faForward } from "@fortawesome/free-solid-svg-icons"
library.add(faSpinner, faThumbsUp, faThumbsDown, faArrowLeft, faRedo, faForward);

const Spinner = styled.div`
  margin-top: 50%;
  color: #fff; 
  align-items: center; 
  text-align: center;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
const CardBody = styled.div`
  width: 100%;
  color: #fff;
  flex: 1;
  justify-content: center; 
  align-items: center;
  display: flex; 
  flex-direction: column; 
  .spinner {
    text-align: center;
    align-items: center; 
    align-self: center; 
    vertical-align: middle;
  }
  button { 
    border: none;
    background: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
  .card-center { 
    flex: 1;
    color: #000;
    /* border-radius: 30px; */
    width: 100%;
    height: 300px;
    text-align: center; 
    background-color: #fff;
    box-shadow: 0px 8px 26px -12px rgba(0,0,0,0.7);
    text-align: center; 
    display: flex; 
    flex-direction: column; 
    .card-text { 
      flex: 1;
      font-size: 2.3rem; 
      align-self: auto;
      vertical-align: middle; 
      justify-content: center; 
    }
    .sub-card-text { 
      flex: 1;
      font-size: 1.5rem;
    }
    .button-container-center { 
      flex: 1;
      display: flex;
      flex-direction: row;
      align-self: auto;
      height: 100%
      div { 
        flex: 1;
        text-align: center;
        align-self: center;
      }
     button {
      height: 100%; 
      width: 100%;
      font-size: 1rem;
      transition: all 1s; 
      border: none;
      background-color: #fff;
      &:hover{
        /* background-color: red; */
      }
    }
    }
  }
  .button-container-bottom { 
    flex: .4;
    display: flex;
    flex-direction: row;
    width: 100%;
    div { 
        flex: 1;
      }
    .easy-button {
      height: 100%; 
      width: 100%;
      font-size: 1.5rem;
      transition: all 1s; 
      border: none;
      background-color: #EDAD1E;
      color: #fff;
      &:hover{
        background-color: #048CAC;
      }
    }
     .hard-button {
      height: 100%; 
      width: 100%;
      font-size: 1.5rem;
      transition: all 1s; 
      border: none;
      background-color: #F53240;
      color: #fff;
      &:hover{
        background-color: #048CAC;
      }
    }
  }
  .button-container-top { 
    display: flex;
    flex: .4;
    flex-direction: row;
    height: 60px;
    color: #fff;
    background-color: #145674;
    width: 100%;
    div { 
        flex: 1;
      }
    button {
      height: 100%; 
      width: 100%;
      font-size: 1rem;
      transition: all 1s; 
      border: none;
      color: #fff;
      background-color: #145674;
      &:hover{
        background-color: #048CAC;
      }
    }
  }
  
`

const Card = ({
  cardText,
  currentDeck,
  cardList,
  currentCard,
  updateCard,
  cardFlipped,
  flipCard,
  prevCard,
  hintShown,
  showHint,
  addToUserDeck,
  userDeck,
  getRating,
  currentRating,
}) => {
  const deckLength = cardList[0];
  if (currentDeck.length >= 1) {
    return (
      <CardBody>
        <div className='button-container-top'>
          <div>
            <Link to='/Decks'>
              <button>
                <FontAwesomeIcon icon="arrow-left" size="2x" />
              </button>
            </Link>
          </div>
          <div>
            <button onClick={() => {
              updateCard(currentCard.id);
            }}
            >
              <FontAwesomeIcon icon="forward" size="2x" />
            </button>
            {/* <button onClick={() => {
              prevCard(currentCard.id);
            }}
            >
              PREV
          </button> */}
          </div>
          {/* <div>Time Spent on card</div> */}
        </div>
        <div className='card-center'>
          <div className='button-container-center'>
            <div>
              {currentRating}
            </div>
            {/* <div>
              <button onClick={() => {
              showHint();
            }}>
              Hint
            </button>
            </div> */}
            <div> {currentDeck} {currentCard.id} / {deckLength.cards.length}</div>
            <div>
              <button onClick={() => {
                flipCard();
              }}
              >
                <FontAwesomeIcon icon="redo" size="2x" />
              </button>
            </div>
          </div>
          <div className='card-text'>{cardFlipped === 'back' ? currentCard.flip : currentCard.kana}</div>
          <div className='sub-card-text'>{cardFlipped === 'back' ? currentCard.sub : ''}</div>
          <div>{hintShown === true ? 'HINT: ' + currentCard.hint : ''} </div>
        </div>
        <div className='button-container-bottom'>
          <button className='hard-button' onClick={() => {
            addToUserDeck(currentCard, currentDeck, 'Hard');
          }}
          >
            <FontAwesomeIcon icon="thumbs-down" size="2x" />
          </button>
          <button className='easy-button' onClick={() => {
            addToUserDeck(currentCard, currentDeck, 'Easy');
          }}
          >
            <FontAwesomeIcon icon="thumbs-up" size="2x" />
          </button>
        </div>

      </CardBody>
    )
  } else return (
    <Spinner>
      {/* <button>
        <Link to='/Decks'>
          Back
            </Link>
      </button> */}
      <FontAwesomeIcon icon="spinner" pulse size="6x" />
    </Spinner>
  )
}

export default Card;