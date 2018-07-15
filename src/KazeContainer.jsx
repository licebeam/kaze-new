import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import KazeBody from './components/KazeBody';
import styled from 'styled-components';

const propTypes = {
  currentDeck: PropTypes.string,
  cardList: PropTypes.array,
  currentCard: PropTypes.object,
  updateCard: PropTypes.func,
  cardFlipped: PropTypes.bool,
  flipCard: PropTypes.func,
  prevCard: PropTypes.func,
  addToUserDeck: PropTypes.func,
  userDeck: PropTypes.array,
  getRating: PropTypes.func,
  currentRating: PropTypes.string,
};

const Container = styled.div`
  overflow-x: hidden;
  background-color: #eee;
  height: 80vh;
  font-family: 'Roboto', sans-serif;
`

class KazeContainer extends Component {
  render() {
    const {
      currentDeck,
      cardList,
      currentCard,
      updateCard,
      flipCard,
      cardFlipped,
      prevCard,
      hintShown,
      showHint,
      addToUserDeck,
      userDeck,
      getRating,
      currentRating
    } = this.props;
    return (
      <Container>
        <KazeBody
          currentDeck={currentDeck}
          cardList={cardList}
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
      </Container>
    );
  }
}
KazeContainer.propTypes = this.PropTypes;
export default KazeContainer;
