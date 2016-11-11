import React, { Component } from 'react';
import './App.css';
import CharacterWindow from './components/CharacterWindow/CharacterWindow.js'
import SpellsWindow from './components/SpellsWindow/SpellsWindow.js'
import InventoryWindow from './components/InventoryWindow/InventoryWindow.js'
import Window from './components/Window/Window.js'
import MapWindow from './components/MapWindow/MapWindow.jsx'
import character from './character.js'
import update from 'immutability-helper'

class App extends Component {
   constructor(props) {
      super(props);
      this.onWindowResizeOrDragStart = this.onWindowResizeOrDragStart.bind(this);
      this.onWindowResizeStop = this.onWindowResizeStop.bind(this);
      this.onWindowDragStop = this.onWindowDragStop.bind(this);
      this.onWindowClick = this.onWindowClick.bind(this);

      this.state = {
         windows: this.state.windows || this.initialState.windows,
         zIndexes: this.initialState.zIndexes
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
      }
   }

   state = JSON.parse(localStorage.getItem('state') || '{}')

   componentDidUpdate(prevProps, prevState) {
      localStorage.state = JSON.stringify(this.state);
   }

   maxZIndex = 4;

   moveToTop(windowId) {
      const newState = 
         update(this.state, {
            zIndexes: {
               $merge: {
                  [windowId]: this.maxZIndex
               }
            }
         });
      this.maxZIndex++;
      this.setState(newState);
   }

   onWindowResizeOrDragStart(windowId) {
      this.moveToTop(windowId);
   }

   onWindowClick(windowId){
      this.moveToTop(windowId);
   }

   onWindowResizeStop(windowId, direction, styleSize, clientSize, event) {
      const newState = 
         update(this.state, {
            windows: {
               [windowId]: {
                  $merge: {
                     width: styleSize.width,
                     height: styleSize.height
                  }
               }
            }
         });
      this.setState(newState);
   }

   onWindowDragStop(windowId, event, ui){
      const newState = 
         update(this.state, {
            windows: {
               [windowId]: {
                  $merge: {
                     top: ui.position.top,
                     left: ui.position.left
                  }
               }
            }
         });
      this.setState(newState);
   }

   render() {
      const { windows, zIndexes } = this.state,
         window_divs = [],
         components = {
            'character': <CharacterWindow character={ character }/>,
            'map': <MapWindow />,
            'inventory': <InventoryWindow character={ character } />,
            'spells': <SpellsWindow character={ character } />
         }

      for (var key in windows) {
         if (windows.hasOwnProperty(key)){
            const curWindow = windows[key];
            window_divs.push((
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
            {window_divs}
         </div>
      );
   }
}

export default App;