import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';

const MainBody = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #21A4D3;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  .card-container { 
    flex: 1; 
    background-color: #21A4D3;
    vertical-align: middle;
    display: flex;
  }
  .user-input { 
    flex: .4; 
    background-color: #21A4D3;
  }
`

const KazeBody = ({
  cardList,
  currentDeck,
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
  return (
    <MainBody>
      <div className='card-container'>
        <Card
          cardList={cardList}
          currentDeck={currentDeck}
          currentCard={currentCard}
          updateCard={updateCard}
          cardFlipped={cardFlipped}
          flipCard={flipCard}
          prevCard={prevCard}
          hintShown={hintShown}
          showHint={showHint}
          addToUserDeck={addToUserDeck}
          userDeck={userDeck}
          getRating={getRating}
          currentRating={currentRating}
        />
      </div>
      <div className='user-input'></div>
    </MainBody>
  )
}

export default KazeBody;