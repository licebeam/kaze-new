import React, {Component} from 'react';
import styled from 'styled-components';


const CardBody = styled.div`
  width: 100%;
  color: #fff;
  flex: 1;
  justify-content: center; 
  display: flex; 
  flex-direction: column; 

  .card-center { 
    flex: 1;
    margin-top: 20px;
    color: #000;
    border: 2px solid transparent; 
    border-radius: 30px;
    width: 100%;
    height: 300px;
    text-align: center; 
    background-color: #fff;
  }
  .button-container { 
    flex: .6;
    background-color: #fff;
  }
`

const Card = ({
  cardText,
}) => {
  return (
    <CardBody>
      <div className='card-center'>This is a flashcard</div>
      <div className='button-container'>
        <button></button>
      </div> 
    </CardBody>
  )
}

export default Card;