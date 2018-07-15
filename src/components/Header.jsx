import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import kute from 'kute.js'
const HeaderBody = styled.div`
  z-index: 10;
  width: 100%;
  height: 10vh;
  background-color: #3A3A3A;
  color: #fff;
  display: flex; 
  text-align: center; 
  font-family: 'Roboto', sans-serif;
  div {
    padding: 20px; 
    flex: 1;
    img { 
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
  }
`

const Header = ({
  userHandle,
  userPhoto,
}) => {
  return (
    <HeaderBody>
      <h1>Kaze</h1>
      <div></div>
      <Link to='/Profile'>
        <div><img src={userPhoto} alt="" /></div>
      </Link>
      <Link to='/Profile'>
        <div>{userHandle}</div>
      </Link>
    </HeaderBody>
  )
}

export default Header;