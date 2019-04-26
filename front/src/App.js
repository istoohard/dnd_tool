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
  }

  toggleDisplay(evt) {
    let el = evt.currentTarget;
    let index = el.getAttribute('id');
    let item = this.state.data[index];
    if(item.isCollapsed===true){
      item.isCollapsed=false;
      this.setState({ data: this.state.data });
    }
    else{
      item.isCollapsed=true;
      this.setState({ data: this.state.data });
    }
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
      data = data.map(it => {
        it.isCollapsed = true;
        return it;
      });
      return data;
    })
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
              this.state.data.map((item, idx)  => 
              
              <div className="sheet" align="left">
                {this.toggleDisplay = this.toggleDisplay.bind(this)}
                <div className="name" align="center">
                  <h1 id={idx} onClick={this.toggleDisplay} >{item.name}</h1>
                </div>
                
                {(item.isCollapsed)? null:
                <div  id="info" className="info">
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
                      <tr className="statVal">
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
                    <h3>Armor Class:</h3>
                    <p>{item.armor_class}</p>
                    <h3>Hit Points:</h3>
                    <p>{item.hit_points} ({item.hit_dice})</p>
                    <h3>Speed:</h3>
                    <p>{item.speed}</p>
                  </div>
              
                  <div className = "savingThrows">
                    <h3>Saving Throws:</h3> 
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
                    <h3>Damage Immunities: </h3>
                    <p>{item.damage_immunities}</p>
                    <h3>Condition Immunites:</h3>
                    <p>{item.conditino_immunities}</p>
                  </div>
              
                  <div className = "passiveAbilities">
                    <h3>Senses:</h3>
                    <p>{item.senses}</p>
                    <h3>Languages:</h3>
                    <p>{item.languages}</p>
                    <h3>Challenge Rating:</h3>
                    <p>{item.challenge_rating}</p>
                  </div>
               
                  <div className = "specialAbilities">
                    <h3>Special Abilities:</h3> 
                    <div>
                      {(item.special_abilities)?
                      item.special_abilities.map(item =>
                        <div>
                          <h4>{item.name}</h4> 
                          <p>{item.desc}</p>
                        </div>
                        ):null}
                    </div>  
                  </div>
              
                  <div className = "actions">
                    <h3>Actions:</h3>
                    <div>
                      {(item.actions)?
                      item.actions.map(item =>
                        <div>
                          <h4>{item.name}</h4> 
                          <p>{item.desc}</p>
                        </div>
                        ):null}
                    </div>
                  </div>
                </div>}
              </div>
              )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
