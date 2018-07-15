import React, { Component } from 'react';
import styled from 'styled-components';
import Card from './Card';

const MainBody = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', sans-serif;
  .card-container { 
    flex: 1; 
    background-color: #fff;
    vertical-align: middle;
    display: flex;
  }
  .user-input { 
    flex: .4; 
    background-color: #fff;
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
      <div className='user-input'>User Input? and perhaps a progress bar for the current card set?</div>
    </MainBody>
  )
}

export default KazeBody;