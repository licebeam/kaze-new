import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const CardBody = styled.div`
  width: 100%;
  color: #fff;
  flex: 1;
  justify-content: center; 
  align-items: center;
  display: flex; 
  flex-direction: column; 
  .card-center { 
    flex: 1;
    margin-top: 20px;
    color: #000;
    border-radius: 30px;
    width: 90%;
    height: 300px;
    text-align: center; 
    background-color: #eee;
    box-shadow: 0px 8px 26px -12px rgba(0,0,0,0.7);
    text-align: center; 
    display: flex; 
    flex-direction: column; 
    .card-text { 
      flex: 1;
      font-size: 2rem; 
      align-self: auto;
      vertical-align: middle; 
      justify-content: center; 
    }
    .sub-card-text { 
      flex: 1;
      font-size: 1rem;
    }
    .button-container-center { 
      flex: 1;
      display: flex;
      flex-direction: row;
      align-self: auto;
      vertical-align: middle; 
      justify-content: center; 
      div { 
        flex: 1;
      }
      button {
        margin: 20px 10px 0px 10px;
        border-radius: 50%;
        border: 1px solid #000;
        width: 50px; 
        height: 50px; 
        transition: all 1s; 
        &:hover{
        background-color: red;
        }
      }
    }
  }
  .button-container-bottom { 
    flex: .6;
    display: flex;
    flex-direction: row;
    div { 
        flex: 1;
      }
    button {
      margin: 20px 10px 0px 10px
      border-radius: 30px;
      border: 1px solid #000;
      width: 60px; 
      height: 30px; 
      transition: all 1s; 
      &:hover{
        background-color: red;
      }
    }
  }
  .button-container-top { 
    flex: .3;
    display: flex;
    flex-direction: row;
    color: #000;
    background-color: #4472C4;
    width: 100%;
    div { 
        flex: 1;
      }
    button {
      margin: 20px 10px 0px 10px
      border-radius: 30px;
      border: 1px solid #000;
      width: 40px; 
      height: 20px; 
      font-size: .6rem;
      transition: all 1s; 
      &:hover{
        background-color: red;
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
  if (currentDeck.length >= 1) {
    return (
      <CardBody>
        <div className='button-container-top'>
          <div>
            <button>
              <Link to='/Decks'>
                Back
            </Link>
            </button>
          </div>
          <div>
            <button onClick={() => {
              updateCard(currentCard.id);
            }}
            >
              NEXT
          </button>
            <button onClick={() => {
              prevCard(currentCard.id);
            }}
            >
              PREV
          </button>
          </div>
          <div>Time Spent on card</div>
        </div>
        <div className='card-center'>
          <div className='button-container-center'>
            <div>
              {currentRating}
            </div>
            <div>
              {/* <button onClick={() => {
              showHint();
            }}>
              Hint
            </button> */}
            </div>
            <div> {currentDeck}</div>
            <div>
              <button onClick={() => {
                flipCard();
              }}
              >
                Flip
            </button>
            </div>
          </div>
          <div className='card-text'>{cardFlipped === 'back' ? currentCard.flip : currentCard.kana}</div>
          <div className='sub-card-text'>{cardFlipped === 'back' ? currentCard.sub : ''}</div>
          <div>{hintShown === true ? 'HINT: ' + currentCard.hint : ''} </div>
        </div>
        <div className='button-container-bottom'>
          <button onClick={() => {
            addToUserDeck(currentCard, currentDeck, 'Hard');
          }}
          >
            Difficult
        </button>
          <button onClick={() => {
            addToUserDeck(currentCard, currentDeck, 'Easy');
          }}
          >
            Easy
        </button>
        </div>

      </CardBody>
    )
  } else return (
    <div>
      <button>
        <Link to='/Decks'>
          Back
            </Link>
      </button>
      <div>Please Choose a Deck</div>
    </div>
  )
}

export default Card;