import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.click = this.click.bind(this);
    this.state = {val: 1, tex:'', cat:''};
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(evt) {
  this.setState({
    tex: evt.target.value
    })
  }
  
  click(evt) {
    this.setState({cat:'name/'})
  }
  
  render() {
    let url = "https://dnd-tool-christophercookson.c9users.io/"
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>Our state variable's value is {this.state.val}</p>
          <button onClick={this.click}>By name</button>
          <input
            type="text"
            value={this.state.tex}
            onChange={this.handleChange}
          />
          <a
            className="App-link"
            href={url+this.state.cat+this.state.tex}
            target="_blank"
            rel="noopener noreferrer"
          >
            Try My Tool!
          </a>
        </header>
      </div>
    );
  }
}

export default App;
