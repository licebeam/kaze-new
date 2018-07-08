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
      font-size: 3rem; 
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
    }
  }
  .button-container-top { 
    flex: .3;
    display: flex;
    flex-direction: row;
    color: #000;
    background-color: #eee;
    width: 100%;
    div { 
        flex: 1;
      }
    button {
      margin: 20px 10px 0px 10px
      border-radius: 30px;
      border: 1px solid #000;
      width: 60px; 
      height: 30px; 
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
}) => {
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
            NEXT CARD
          </button>
          <button onClick={() => {
            prevCard(currentCard.id);
          }}
          >
            PREV CARD
          </button>
        </div>
        <div>Time Spent on card</div>
      </div>
      <div className='card-center'>
        <div className='button-container-center'>
          <div>
            <button onClick={() => {
              showHint();
            }}>
              Hint
            </button>
          </div>
          <div> {currentDeck} {currentCard.id + '/' + (cardList.length + 1)}</div>
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
        <button>Repeat</button>
        <button>Easy</button>
        <button>Medium</button>
        <button>Hard</button>
      </div>

    </CardBody>
  )
}

export default Card;