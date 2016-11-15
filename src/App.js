import React, { Component } from 'react';
import './App.css';
import CharacterWindow from './components/CharacterWindow/CharacterWindow.js'
import SpellsWindow from './components/SpellsWindow/SpellsWindow.js'
import InventoryWindow from './components/InventoryWindow/InventoryWindow.js'
import Window from './components/Window/Window.js'
import MapWindow from './components/MapWindow/MapWindow.jsx'
import { zIndexManager } from './components/Utils.js'
import Popup from './components/Popup/Popup.jsx'
import character from './character.js'
import update from 'immutability-helper'

class App extends Component {
   constructor(props) {
      super(props);
      this.onWindowResizeOrDragStart = this.onWindowResizeOrDragStart.bind(this);
      this.onWindowResizeStop = this.onWindowResizeStop.bind(this);
      this.onWindowDragStop = this.onWindowDragStop.bind(this);
      this.onWindowClick = this.onWindowClick.bind(this);
      this.onActivateData = this.onActivateData.bind(this);
      this.onDeactivateData = this.onDeactivateData.bind(this);
      this.onPopupMouseEnter = this.onPopupMouseEnter.bind(this);
      this.onPopupMouseLeave = this.onPopupMouseLeave.bind(this);

      this.state = {
         windows: this.state.windows || this.initialState.windows,
         zIndexes: this.initialState.zIndexes,
         popup: this.initialState.popup
      }
   }

   initialState = {
      windows: {
         map: {
            top: 20,
            left: 690,
            height: 450,
            width: 600,
            title: 'Map',
            minWidth: 300,
            minHeight: 300,
            maxWidth: 700,
            maxHeight: 600
         },
         character: {
            top: 20,
            left: 286,
            width: 400,
            height: 376,
            title: character.name,
            minWidth: 300,
            minHeight: 376,
            maxWidth: 500,
            maxHeight: 500
         },
         inventory: {
            top: 475,
            left: 691,
            width: 602,
            height: 350,
            title: 'Inventory',
            minWidth: 430,
            minHeight: 300,
            maxWidth: 800,
            maxHeight: 500,
            zIndex: 3
         },
         spells: {
            top: 401,
            left: 286,
            width: 400,
            height: 430,
            title: 'Spells',
            minWidth: 300,
            minHeight: 300,
            maxWidth: 600,
            maxHeight: 600
         }
      },
      zIndexes: {
         map: 1,
         character: 2,
         inventory: 3,
         spells: 4
      },
      popup: {
         visible: false,
         top: 0,
         left: 0,
         content: ''
      }
   }

   onActivateData({domId, namespace, id, clientX, clientY}){
      const {left, top, height} = document.getElementById(domId).getBoundingClientRect();
      
      this.setState({
         popup: {
            visible: true,
            top: clientY + 15,
            left: clientX,
            content: id
         }
      });
   }

   onDeactivateData(){
      //TODO: onDeactivateData triggers before onPopupMouseEnter for mapWindow
      if (!this.popupHovered){
         this.setState({ 
            popup: {
               visible: false
            }
         });
      }
   }

   onPopupMouseEnter(){
      this.popupHovered = true;
   }

   onPopupMouseLeave(){
      this.popupHovered = false;
   }

   // Save and load state from localStorage
   state = JSON.parse(localStorage.getItem('mw-state') || '{}')
   componentDidUpdate(prevProps, prevState) {
      localStorage['mw-state'] = JSON.stringify(this.state);
   }

   // move window to top
   moveToTop(windowKey) {
      const newZIndexes = zIndexManager.getNewZIndexes(this.state.zIndexes, windowKey);
      this.setState({zIndexes: newZIndexes})
   }

   onWindowResizeOrDragStart(windowKey) {
      this.moving = true;
      this.moveToTop(windowKey);
   }

   onWindowClick(windowKey){
      if (!this.moving){ 
         this.moveToTop(windowKey);
      }
   }

   onWindowResizeStop(windowKey, direction, styleSize, clientSize, event) {
      const newState = 
         update(this.state, {
            windows: {
               [windowKey]: {
                  $merge: {
                     width: styleSize.width,
                     height: styleSize.height
                  }
               }
            }
         });
      this.setState(newState);
      this.moving = false;
   }

   onWindowDragStop(windowKey, event, ui){
      const newState = 
         update(this.state, {
            windows: {
               [windowKey]: {
                  $merge: {
                     top: ui.position.top,
                     left: ui.position.left
                  }
               }
            }
         });
      this.setState(newState);
      this.moving = false;
   }

   render() {
      const { windows, zIndexes, popup } = this.state,
         windowsContainers = [],
         //TODO: looks terribly
         components = {
            'character': <CharacterWindow character={character} onActivateData={this.onActivateData} onDeactivateData={this.onDeactivateData}/>,
            'inventory': <InventoryWindow character={character} onActivateData={this.onActivateData} onDeactivateData={this.onDeactivateData}/>,
            'spells': <SpellsWindow character={character} onActivateData={this.onActivateData} onDeactivateData={this.onDeactivateData}/>,
            'map': <MapWindow places={character.places} onActivateData={this.onActivateData} onDeactivateData={this.onDeactivateData}/>
         }

      for (let key in windows) {
         if (windows.hasOwnProperty(key)){
            const curWindow = windows[key];
            windowsContainers.push((
                  <Window
                     key={key}
                     id={key}
                     title={curWindow.title} 
                     width={curWindow.width}  
                     minWidth={curWindow.minWidth}
                     minHeight={curWindow.minHeight}  
                     maxWidth={curWindow.maxWidth}  
                     maxHeight={curWindow.maxHeight}  
                     height={curWindow.height} 
                     top={curWindow.top}
                     left={curWindow.left}
                     zIndex={zIndexes[key]}
                     onResizeStart={this.onWindowResizeOrDragStart}
                     onResizeStop={this.onWindowResizeStop}
                     onDragStart={this.onWindowResizeOrDragStart}
                     onDragStop={this.onWindowDragStop}
                     onClick={this.onWindowClick}>
                     {components[key]}
                  </Window>
               ))
         }
      }

      return (
         <div className="App">
            {windowsContainers}
            <Popup 
               left={popup.left} 
               top={popup.top} 
               content={popup.content}
               visible={popup.visible}
               onMouseEnter={this.onPopupMouseEnter}
               onMouseLeave={this.onPopupMouseLeave}/>
         </div>
      );
   }
}

export default App;