import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import KazeBody from './components/KazeBody';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Container = styled.div `
  margin: 0 auto; 
  padding: 0;
  overflow-x: hidden;
  background-color: #eee;
  height: 100vh;
`

const dbAdd = () => {
  db.collection("users").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}
class LogIn extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Container>
        <h1>Kaze App test</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
        <div>
          <button db={db} onClick={() => {
            dbAdd();
          }}>
            <Link to='/Home'>
              Continue without logging in?
            </Link>
          </button>
        </div>
      </Container>
    );
  }
}

export default LogIn;
