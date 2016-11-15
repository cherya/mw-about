import React, { Component } from 'react';
import Table from '../Table/Table.js'
import './SpellsWindow.css'

class SpellsWindow extends Component {

   get character(){
      return this.props.character;
   }

   render(){
      return (
         <div className="spells-wrapper">
            <div className="character-buffs tiny-border">
               <img src={process.env.PUBLIC_URL + '/images/spells/Absorb_Attribute.jpg'} className="buff" alt="kek"></img>
               <img src={process.env.PUBLIC_URL + '/images/spells/Resist_Common_Disease.jpg'} className="buff" alt="kek"></img>
               <img src={process.env.PUBLIC_URL + '/images/spells/Fortify_Magicka.jpg'} className="buff" alt="kek"></img>
               <img src={process.env.PUBLIC_URL + '/images/spells/Fortify_Health.jpg'} className="buff" alt="kek"></img>
            </div>
            <div className="character-spells tiny-border">
               <Table head="Powers" data={this.character.powers} 
                     onActivateData={this.props.onActivateData} 
                     onDeactivateData={this.props.onDeactivateData}/>
               <Table head={["Spells", "Cost/Chance"]} data={this.character.spells} 
                     onActivateData={this.props.onActivateData} 
                     onDeactivateData={this.props.onDeactivateData}/>
            </div>
         </div>
      )
   }
}

export default SpellsWindow;