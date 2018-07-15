import React, { Component } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const propTypes = {
  addCardToDb: PropTypes.func,
};

const AdminContainer = styled.div`
height: 80vh;
display: flex;
flex-direction: column; 
padding: 20px;
font-size: 2rem;
color: grey;
align-items: center;
align-self: center;
 input{
   padding: 10px;
   height: 15px;
   font-size: 1.5rem;
   width: 300px;
 }
 button {
   height: 20px;
   width: 100px;
 }
`
class AdminPanel extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    const { addCardToDb } = this.props;
    this.state = {
      group: 'JLPT N5 Vocab',
      kana: '',
      id: null,
      flip: '',
      hint: '',
      sub: '',
      furigana: '',
      groupId: 1,
    }
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  render({ addCardToDb } = this.props) {
    return (
      <AdminContainer>
        <button>
          <Link to='/Decks'>
            Back
          </Link>
        </button>
        group:
        <input type="text" name="group"
          defaultValue={'JLPT N5 Vocab'}
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        group id:
        <input type="text" name="group"
          defaultValue={'1'}
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        id:
        <input type="value" name="id"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        kana:
        <input type="text" name="kana"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        flip:
        <input type="text" name="flip"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        hint:
        <input type="text" name="hint"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        sub:
        <input type="text" name="sub"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        furigana:
        <input type="text" name="furigana"
          value={this.state.value}
          onChange={this.handleInputChange}
        />

        <button onClick={() => {
          addCardToDb(this.state.group, this.state.kana, this.state.id,
            this.state.flip, this.state.hint, this.state.sub, this.state.furigana, this.state.groupId);
        }}>
          Submit
         </button>
      </AdminContainer >
    )
  }
}

AdminPanel.propTypes = this.PropTypes;
export default AdminPanel