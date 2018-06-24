import React, {Component} from 'react';
import styled from 'styled-components';


const CardBody = styled.div`
  width: 100%;
  color: #fff;
  flex: 1;
  justify-content: center; 
  align-items: center;
  display: flex; 
  flex-direction: column; 
  .card-center { 
    flex: 1;
    margin-top: 20px;
    color: #000;
    border-radius: 30px;
    width: 80%;
    height: 300px;
    text-align: center; 
    background-color: #eee;
    box-shadow: 0px 8px 26px -12px rgba(0,0,0,0.75);
  }
  .button-container { 
    flex: .6;
    button {
      margin-top: 20px;
      border-radius: 30px;
      border: 1px solid #000;
      width: 60px; 
      height: 30px; 
    }
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
        <button></button>
        <button></button>
        <button></button>
      </div> 
    </CardBody>
  )
}

export default Card;