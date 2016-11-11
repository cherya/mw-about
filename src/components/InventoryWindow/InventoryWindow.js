import React, { Component } from 'react';
import StatusBar from '../StatusBar/StatusBar.js'
import Button from '../Button/Button.js'
import './InventoryWindow.css'

class InventoryWindow extends Component {

   get character(){
      return this.props.character;
   }

   render(){
      return (
         <div className="inventory-wrapper">
            <div className="left-wrapper">
               <StatusBar value="184" maxValue="340"/>
               <div className="character-model tiny-border"></div>
            </div>
            <div className="right-wrapper">
               <div className="inventory-buttons">
                  <Button caption="All"/>
                  <Button caption="Weapon"/>
                  <Button caption="Apparel"/>
                  <Button caption="Magic"/>
                  <Button caption="Misc"/>
               </div>
               <div className="inventory tiny-border"></div>
            </div>
         </div>
      )
   }
}

export default InventoryWindow;