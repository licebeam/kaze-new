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
    width: 90%;
    height: 300px;
    text-align: center; 
    background-color: #eee;
    box-shadow: 0px 8px 26px -12px rgba(0,0,0,0.7);
    text-align: center; 
    display: flex; 
    flex-direction: column; 
    .card-text { 
      flex: 1;
      font-size: 2rem; 
    }
    .button-container-center { 
      flex: .5;
      display: flex;
      flex-direction: row;
      div { 
        flex: 1;
      }
      button {
        margin: 20px 10px 0px 10px
        border-radius: 50%;
        border: 1px solid #000;
        width: 50px; 
        height: 50px; 
      }
    }
  }
  .button-container-bottom { 
    flex: .6;
    button {
      margin: 20px 10px 0px 10px
      border-radius: 30px;
      border: 1px solid #000;
      width: 60px; 
      height: 30px; 
    }
  }
  .button-container-top { 
    flex: .3;
    button {
      margin: 20px 10px 0px 10px
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
      <div className='button-container-top'>
        <button>Repeat</button>
        <button>Next</button>
      </div> 
      <div className='card-center'>
        <div className='button-container-center'>
          <div><button></button></div>
          <div> Japanese Lesson 1/20</div>
          <div><button></button></div>
        </div>
        <div className='card-text'>This is a flashcard</div>
      </div>
      <div className='button-container-bottom'>
        <button>Repeat</button>
        <button>Easy</button>
        <button>Medium</button>
        <button>Hard</button>
      </div> 
      
    </CardBody>
  )
}

export default Card;