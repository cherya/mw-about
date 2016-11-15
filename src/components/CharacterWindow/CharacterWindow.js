import React, { Component } from 'react';
import CharacterStatus from '../CharacterStatus/CharacterStatus.js'
import Table from '../Table/Table.js'
import './CharacterWindow.css'

class CharacterWindow extends Component {

   get character(){
      return this.props.character;
   }

   getSkills(character){
      var skills = [];
      for (var key in character.skills){
         if (character.skills.hasOwnProperty(key)){
            skills.push(
                  <Table head={[key]} data={character.skills[key]} key={key}
                     name="skills"
                     onActivateData={this.props.onActivateData} 
                     onDeactivateData={this.props.onDeactivateData} />
               )
         }
      }
      return skills;
   }

   render(){
      return (
         <div className="character-wrapper">
            <div className="character-left-group">
               <div className="character-group tiny-border">
                  <CharacterStatus character={this.character}/>
               </div>
               <div className="character-group tiny-border">
                  <Table data={ this.character.main } 
                     name="main"
                     onActivateData={this.props.onActivateData} 
                     onDeactivateData={this.props.onDeactivateData}/>
               </div>
               <div className="character-group tiny-border">
                  <Table data={ this.character.characteristics }
                     name="characteristics"
                     onActivateData={this.props.onActivateData} 
                     onDeactivateData={this.props.onDeactivateData}/>
               </div>
            </div>
            <div className="character-right-group">
               <div className="cahracter-skills character-group tiny-border">
                  {this.getSkills(this.character)}
               </div>
            </div>
         </div>
      )
   }
}

export default CharacterWindow;