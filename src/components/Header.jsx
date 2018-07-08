import React, { Component } from 'react';
import styled from 'styled-components';


const HeaderBody = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #234e;
  color: #fff;
  display: flex; 
  text-align: center; 
  font-family: 'Roboto', sans-serif;
  div {
    padding: 20px; 
    flex: 1;
  }
`

const Header = ({ userHandle }) => {
  return (
    <HeaderBody>
      <div>Kaze Logo</div>
      <div>image</div>
      <div>settings</div>
      <div>{userHandle}</div>
    </HeaderBody>
  )
}

export default Header;