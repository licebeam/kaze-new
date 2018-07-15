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
  flex-direction: row;
  text-align: center; 
  font-family: 'Roboto', sans-serif;
  .title {
    align-content: center;
    text-align: center;
    flex: 1; 
  }
  div {
    padding: 20px; 
    flex: 1;
    img { 
      border: 4px solid #fff;
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
      <div className="title">
        <h1>Kaze</h1>
      </div>

      <div></div>
      <div className="user-pic">
        <Link to='/Profile'>
          <div><img src={userPhoto} alt="" /></div>
        </Link>
      </div>
      <div className="user-name">
        <Link to='/Profile'>
          <div>{userHandle}</div>
        </Link>
      </div>

    </HeaderBody>
  )
}

export default Header;