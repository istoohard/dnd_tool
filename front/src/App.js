import React, { Component } from 'react';
import './App.css';

const fetch = require('node-fetch');
const api = 'https://dndtoolbackend-jaredbeltz.c9users.io/';
const check = require('./checker');
//const scores = require('./scores');


class App extends Component {
  

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {tex: [], cat: [], data:[]};
    this.handleChange = this.handleChange.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange(evt) {
    this.setState({
      tex: evt.target.value,
      cat: document.getElementById("sec").value + document.getElementById("typ").value
    });
  }

  search(evt) {
    fetch(api+this.state.cat+this.state.tex)
    .then(response => response.json())
    .then(data => {
      this.setState({ data });
    });
  }
  
  click(evt) {
    document.getElementsByClassName("info").classList.toggle("display");
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
            <button onClick= {this.search}>
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
          
          <div>
            {
              this.state.data.map(item  => 
              
              <div  className="sheet" align="left">
                
                <div className="name">
                  <h1>{item.name}</h1>
                </div>
              
                <div className="info">
                  <h3>{item.size} {item.type}, {item.alignment}</h3>
                
                  <div className="stats">
                    <table width = '400'> 
                      <tr className="statName" align = "left">
                        <th>STR</th> 
                        <th>DEX</th> 
                        <th>&ensp;CON</th> 
                        <th>&ensp;INT</th> 
                        <th>WIS</th> 
                       <th>CHA</th>
                    </tr>
                     <tr className="statval">
                       <td>{check.statMod(item.strength)}</td> 
                       <td>&ensp;{check.statMod(item.dexterity)}</td> 
                       <td>&ensp;{check.statMod(item.constitution)}</td>
                       <td>&nbsp;{check.statMod(item.intelligence)}</td>
                       <td>&ensp;{check.statMod(item.wisdom)}</td>
                       <td>&ensp;{check.statMod(item.charisma)}</td>
                     </tr>
                    </table>
                  </div>
              
                  <div className = "misc">
                    <h4>Armor Class:</h4>
                    <p>{item.armor_class}</p>
                    <h4>Hit Points:</h4>
                    <p>{item.hit_points} ({item.hit_dice})</p>
                    <h4>Speed:</h4>
                    <p>{item.speed}</p>
                  </div>
              
                  <div className = "savingThrows">
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
              
                  <div className = "immunities">
                    <h4>Damage Immunities: </h4>
                    <p>{item.damage_immunities}</p>
                    <h4>Condition Immunites:</h4>
                    <p>{item.conditino_immunities}</p>
                  </div>
              
                  <div className = "passiveAbilities">
                    <h4>Senses:</h4>
                    <p>{item.senses}</p>
                    <h4>Languages:</h4>
                    <p>{item.languages}</p>
                    <h4>Challenge Rating:</h4>
                    <p>{item.challenge_rating}</p>
                  </div>
               
                  <div className = "specialAbilities">
                    <h4>Special Abilities:</h4> 
                    <p>{check.formatSpecial(item.special_abilities)}</p>
                  </div>
              
                  <div className = "actions">
                    <h4>Actions:</h4>
                    <p>{(check.formatSpecial(item.actions))}</p>
                  </div>
                </div>
              </div> )  
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
