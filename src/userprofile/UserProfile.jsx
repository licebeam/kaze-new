import React, { Component } from 'react';
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const ProfileContainer = styled.div`
height: 80vh;
`
const UserProfile = () => {
  return (
    <ProfileContainer>
      <button>
        <Link to='/Decks'>
          Back
            </Link>
      </button>
      USER PROFILEs

    </ProfileContainer>
  )
}

export default UserProfile