import React, {Component} from 'react';
import styled from 'styled-components';


const CardBody = styled.div`
  width: 60%;
  height: 10vh;
  background-color: #000;
  color: #fff;
`

const Card = ({}) => {
  return (
    <CardBody>
      <div>This is a flashcard</div>
    </CardBody>
  )
}

export default Card;