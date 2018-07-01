import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import KazeBody from './components/KazeBody';
import styled from 'styled-components';

const Container = styled.div `
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #eee;
  height: 100vh;
`

class KazeContainer extends Component {
  render() {
    return (
      <Container>
        <Header/> 
        <KazeBody/> 
        <Footer/>
      </Container>
    );
  }
}

export default KazeContainer;
