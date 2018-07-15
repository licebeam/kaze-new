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
class AdminPanel extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <AdminContainer>
        <form>
          <label>
            Name:
      <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </AdminContainer >
    )
  }
}

export default AdminPanel