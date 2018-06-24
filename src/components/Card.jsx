import React, {Component} from 'react';
import styled from 'styled-components';


const CardBody = styled.div`
  width: 100%;
  background-color: #000;
  color: #fff;
  flex: 1;
  justify-content: center; 
  display: flex; 

  .card-center { 
    margin-top: 20px;
    color: #000;
    border: 2px solid transparent; 
    border-radius: 30px;
    width: 90%;
    height: 200px;
    text-align: center; 
    background-color: #eee;
  }
`

const Card = ({
  cardText,
}) => {
  return (
    <CardBody>
      <div className='card-center'>This is a flashcard</div>
    </CardBody>
  )
}

export default Card;