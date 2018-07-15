import React, { Component } from 'react';
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const AdminContainer = styled.div`
height: 80vh;
display: flex;
flex-direction: column; 
 img { 
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
`
const AdminPanel = ({
  userHandle,
}) => {
  return (
    <AdminContainer>
      <div>ADD CARDS</div>
    </AdminContainer>
  )
}

export default AdminPanel