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
};

const Container = styled.div`
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #eee;
  height: 80vh;
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
        />
      </Container>
    );
  }
}
KazeContainer.propTypes = this.PropTypes;
export default KazeContainer;
