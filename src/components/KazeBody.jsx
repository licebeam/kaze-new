import React, {Component} from 'react';
import styled from 'styled-components';
import Card from './Card';

const MainBody = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .card-container { 
    flex: 1; 
    background-color: #fff;
    vertical-align: middle;
    display: flex;
  }
  .user-input { 
    flex: .4; 
    background-color: #fff;
  }
`

const KazeBody = ({}) => {
  return (
    <MainBody>
      <div className='card-container'>
        <Card/>
      </div>
      <div className='user-input'>User Input? and perhaps a progress bar for the current card set?</div>
    </MainBody>
  )
}

export default KazeBody;