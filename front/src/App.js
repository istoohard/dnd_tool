import React, { Component } from 'react';
import './App.css';

const fetch = require('node-fetch');
const api = 'https://dndtoolbackend-jaredbeltz.c9users.io/';
const check = require('./checker');
//const scores = require('./scores');


class App extends Component {
  

  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.state = {tex: [], cat: [], data:[]};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      tex: evt.target.value,
      cat: document.getElementById("sec").value + document.getElementById("typ").value
    });
  }

  click(evt) {
        fetch(api+this.state.cat+this.state.tex)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        
          <div className="topnav" id="myTopnav">
            <a href={api}><i className="fa fa-home"/></a>
          </div>
          
          <div>
            <input
              type="text"
              value={this.state.tex}
              onChange={this.handleChange}
            />
            <button onClick= {this.click}>
              Search
            </button>
          </div>
          
          <div>
            <select id="sec">
              <option value="name/">Name</option>
              <option value="cr/">CR</option>
              <option value="ac/">AC</option>
              <option value="hp/">HP</option>
            </select>
            <select id="typ">
              <option value="">Equals</option>
              <option value="greater_than/">Above</option>
              <option value="less_than/">Below</option>
              <option value="from/">Range</option>
            </select>
          </div>
          
          <div classname="sheet">
            <p>
            {
              this.state.data.map(item  => 
              
              <div align="left">
              
                <h1>{item.name}</h1>
              
                <h3>{item.size} {item.type}, {item.alignment}</h3>
                
                <div classname="stats">
                  <table width = '400'> 
                    <tr classname="statName" align = "left">
                      <th>STR</th> 
                      <th>DEX</th> 
                      <th>&ensp;CON</th> 
                      <th>&ensp;INT</th> 
                      <th>WIS</th> 
                     <th>CHA</th>
                   </tr>
                   <tr classname="statval">
                     <td>{check.statMod(item.strength)}</td> 
                     <td>&ensp;{check.statMod(item.dexterity)}</td> 
                     <td>&ensp;{check.statMod(item.constitution)}</td>
                     <td>&nbsp;{check.statMod(item.intelligence)}</td>
                     <td>&ensp;{check.statMod(item.wisdom)}</td>
                     <td>&ensp;{check.statMod(item.charisma)}</td>
                   </tr>
                  </table>
                </div>
              
                <div classname = "misc">
                  <h4>Armor Class: {item.armor_class}</h4> 
                  <h4>Hit Points: {item.hit_points} ({item.hit_dice})</h4>
                  <h4>Speed: {item.speed}</h4> 
                </div>
              
                <div classname = "savingThrows">
                  <h4>Saving Throws:</h4> 
                  <p>
                    {check.str(item.strength_save)}
                    {check.dex(item.dexterity_save)}
                    {check.con(item.constitution_save)}
                    {check.int(item.intelligence_save)}
                    {check.wis(item.wisdom_save)}
                    {check.cha(item.charisma_save)}
                  </p>
                </div>
              
                <div classname = "immunities">
                  <h4>Damage Immunities: {item.damage_immunities}</h4>
                  <h4>Condition Immunites: {item.conditino_immunities}</h4>
                </div>
              
                <div classname = "passiveAbilities">
                  <h4>Senses: {item.senses}</h4>
                  <h4>Languages: {item.languages}</h4>
                  <h4>Challenge Rating: {item.challenge_rating}</h4>
                </div>
               
                <div classname = "specialAbilities">
                  <h4>Special Abilities:</h4> 
                  {check.formatSpecial(item.special_abilities)}
                </div>
              
                <div classname = "actions">
                  <h4>Actions:</h4>
                  <p>{(check.formatSpecial(item.actions))}</p>
                </div>
              
              </div> )  
            }
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
