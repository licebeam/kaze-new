import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import KazeBody from './components/KazeBody';
import styled from 'styled-components';

const propTypes = {
  currentDeck: PropTypes.string,
  cardList: PropTypes.array,
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
    const { currentDeck, cardList } = this.props;
    return (
      <Container>
        <KazeBody currentDeck={currentDeck} cardList={cardList} />
      </Container>
    );
  }
}
KazeContainer.propTypes = this.PropTypes;
export default KazeContainer;
