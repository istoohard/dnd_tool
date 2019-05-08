import React, { Component } from 'react';
import './App.css';

const fetch = require('node-fetch');
const api = 'https://dndtoolbackend-jaredbeltz.c9users.io/';
const check = require('./checker');
//const scores = require('./scores');

const divStyle = {
  cursor: 'pointer', 
};

class App extends Component {
  

  constructor(props) {
    super(props);
    this.state = {source: [], text: [], category: [], data:[]};
    this.search = this.search.bind(this);
    this.updateText = this.updateText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.renderSheet = this.renderSheet.bind(this);
    this.renderSpell = this.renderSpell.bind(this);
    this.updateText = this.updateText.bind(this);
    this.alternativeReturn = this.alternativeReturn.bind(this);
  }

  renderSheet(item, idx){
    return <div id = "monster_sheet" className="sheet" align="left">
      {this.toggleDisplay = this.toggleDisplay.bind(this)}
      <div id = "monster_name" className = "name" align="center">
        <h1 id={item.data_key} onClick={this.toggleDisplay} style = {divStyle}>{item.name}</h1>
      </div>
      
      {
        (item.isCollapsed)? null :
        <div  id="monster_info" className="info">
          
          <div className="type">
            <p><i>{item.size} {item.type}, {item.alignment}</i></p>
          </div>
          
          <div className = "misc">
            <p><b>AC:</b> {item.armor_class}</p>
            <p><b>HP:</b> {item.hit_points} ({item.hit_dice})</p>
            <p><b>Speed:</b> {item.speed}</p>
          </div>
          
          <div className = "stats">
            <table width = '400'> 
              <tr className = "stat_name" align = "center">
                <th>STR</th> 
                <th>DEX</th> 
                <th>CON</th> 
                <th>INT</th> 
                <th>WIS</th> 
                <th>CHA</th>
              </tr>
              
              <tr className = "stat_val">
               <td>{check.statMod(item.strength)}</td> 
               <td>{check.statMod(item.dexterity)}</td> 
               <td>{check.statMod(item.constitution)}</td>
               <td>{check.statMod(item.intelligence)}</td>
               <td>{check.statMod(item.wisdom)}</td>
               <td>{check.statMod(item.charisma)}</td>
              </tr>
            </table>
          </div>
          
          <div className = "passive_abilities">
            <p>
              <b>Saving Throws:</b> 
              {check.str(item.strength_save)}
              {check.dex(item.dexterity_save)}
              {check.con(item.constitution_save)}
              {check.int(item.intelligence_save)}
              {check.wis(item.wisdom_save)}
              {check.cha(item.charisma_save)}
            </p>
            
            {(item.damage_immunities)?
              <p><b>Damage Immunites:</b> {item.damage_immunities}</p>
              :null
            }
            
            {(item.condition_immunities)?
              <p><b>Condition Immunites:</b> {item.condition_immunities}</p>
              :null
            }
            
            <p><b>Senses:</b> {item.senses}</p>
            <p><b>Languages:</b> {item.languages}</p>
            <p><b>Challenge Rating:</b> {item.challenge_rating}</p>
          </div>
          
          {(item.special_abilities)?
          <div className = "special_abilities">
            <h3>Special Abilities:</h3> 
              {item.special_abilities.map(item=> {
                return <div>
                <p><b>{item.name}:</b> {item.desc}</p>
                </div>;
              })}
          </div>:null}
          
          {(item.actions)?
          <div className = "actions">
            <h3>Actions:</h3>
              {item.actions.map((item, idx) => {
                return  <div>
                  <p><b>{item.name}:</b> {item.desc}</p>
                </div>;
              })}
          </div>:null}
        </div>
      }
    </div>;
  }
  
  renderSpell(item, idx){
    return <div id = "spell_sheet" className = "sheet" align = "left">
    
      {this.toggleDisplay = this.toggleDisplay.bind(this)}
      
      <div id = "spellName" className="name" align="center">
        <h1 id={idx} onClick={this.toggleDisplay} style = {divStyle}>{item.name}</h1>
      </div>
      
      {
        (item.isCollapsed)? null :
        <div className = "info" id = "spellInfo">
        
          <div className = "type">
            <i>{this.alternativeReturn(item.level)} level {item.school}</i>
          </div>
          
          <div className = "misc">
            <p><b>Casting Time:</b> {item.casting_time}</p>
            <p><b>Range:</b> {item.range}</p>
            <p><b>Components:</b> {item.components}</p>
            <p><b>Duration:</b> {item.duration}</p>
            <p><b>Class:</b> {item.class}</p>
          </div>
          
          <div className = "description">
            <p>{item.desc}</p>
          </div>
          
        </div>
      }
    </div>;
  }

  updateText(evt){
    this.setState ({
      text: evt.target.value
    });
    this.handleChange();
  }
  
  alternativeReturn(int){
    if (int===1){
      return "1st";
    }
    else if(int===2){
      return "2nd";
    }
    else if(int===3){
      return "3rd";
    }
    else{
      return int+"th";
    }
  }

  handleKeyPress(evt) {
    if (evt.keyCode === 13) {
      this.search();
    }
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
      source: document.getElementById("source").value,
      category: document.getElementById("source").value+document.getElementById("sec").value+document.getElementById("typ").value
    });
  }

  search(evt) {
    fetch(api+this.state.category+this.state.text)
    .then(response => response.json())
    .then(data => {
      data = data.map((it, idx) => {
        it.isCollapsed = true;
        it.data_key=idx;
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
            <a href={api}><i className="fa fa-home" /></a>
          
            <div className = "input_container">
              
              <i className = "fa fa-search" onClick = {this.search} />
              
              <input
                className="input_field"
                type="text"
                value={this.state.text}
                onChange={this.updateText}
                placeholder = "Search..."
              />
              
              {document.addEventListener("keyup", this.handleKeyPress)}
            </div>
            
            <div className = "search_filters">
              
              <select className = "custom-select" id="source" onChange = {this.handleChange}>
                <option value="monster">Monster Manual</option>
                <option value="spell">Spellbook</option>
              </select>
              
              {(this.state.source === "monster") ?
              
              <span>
                <select className = "custom-select" id="sec">
                  <option value="/name/">Name</option>
                  <option value="/cr/">CR</option>
                  <option value="/ac/">AC</option>
                  <option value="/hp/">HP</option>
                </select>
                
                <select className = "custom-select" id="typ">
                  <option value="">Equals</option>
                  <option value="greater_than/">Above</option>
                  <option value="less_than/">Below</option>
                </select>
              </span>:
              
              <span>
                <select className = "custom-select" id="sec">
                  <option value="/name/">Name</option>
                  <option value="/class/">Class</option>
                  <option value="/level/">Level</option>
                  <option value="/school/">School</option>
                </select>
                
                <select className = "custom-select"id="typ">
                  <option value="">Equals</option>
                  <option value="greater_than/">Above</option>
                  <option value="less_than/">Below</option>
                </select> 
              </span>
              }
            </div>
          </div>
          <div>
            {
              this.state.data.map((item, idx)  => {
                return (this.state.source === "spell") ?
                  this.renderSpell(item, idx) :
                  this.renderSheet(item, idx);
              })
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
