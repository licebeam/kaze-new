import React, { Component } from 'react';
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const ProfileContainer = styled.div`
height: 80vh;
display: flex;
flex-direction: column; 
 img { 
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
`
const UserProfile = ({
  userHandle,
  userPhoto,
  userEmail,
}) => {
  return (
    <ProfileContainer>
      <div>
        <img src={userPhoto} alt="" />
      </div>
      <div>
        UserName: {userHandle}
      </div>
      <div>
        Registered Email: {userEmail}
      </div>
    </ProfileContainer>
  )
}

export default UserProfile