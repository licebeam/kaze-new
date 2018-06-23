import React, {Component} from 'react';
import styled from 'styled-components';


const MainBody = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .card-container { 
    flex: 1; 
    background-color: #eee;
  }
  .user-input { 
    flex: 1; 
    background-color: #fff;
  }
`

const KazeBody = ({}) => {
  return (
    <MainBody>
      <div className='card-container'>Card Container</div>
      <div className='user-input'>User Input?</div>
    </MainBody>
  )
}

export default KazeBody;