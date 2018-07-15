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
  background-color: #023855;
  color: #fff;
  display: flex; 
  flex-direction: row;
  font-family: 'Roboto', sans-serif;
  .title {
    align-content: center;
    text-align: center;
    flex: 1; 
  }
  /* .user-name { 
    align-content: center;
    text-align: center;
    justify-content: center; 
    flex: 1; 
  } */
  .user-pic { 
    align-content: center;
    text-align: center;
    align-self: center;
    flex: 1; 
  }
  div { 
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
      {/* <div className="user-name">
        <Link to='/Profile'>
          <h6>{userHandle}</h6>
        </Link>
      </div> */}

    </HeaderBody>
  )
}

export default Header;