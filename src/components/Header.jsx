import React, {Component} from 'react';
import styled from 'styled-components';


const HeaderBody = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #000;
  color: #fff;
`

const Header = ({}) => {
  return (
    <HeaderBody>
      <div>I am a header</div>
    </HeaderBody>
  )
}

export default Header;