import React, { Component } from 'react';
import styled from 'styled-components';


const FooterBody = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #fff;
  font-size: .8rem;
  color: darkgrey;
  text-align: left;
  div{
    height: 30px;
  }

`

const Footer = ({ }) => {

  return (
    <FooterBody>
      <div></div>
      This project is totally free and just for fun, images used are temporary, songs used are all by request from the artists.
    </FooterBody>
  )
}

export default Footer;