import React, {Component} from 'react';
import StatusBar from '../StatusBar/StatusBar.js'
import './CharacterStatus.css'

class CharacterStatus extends Component {

   get status(){
      return this.props.character.status;
   }

   render() {
      return (
            <table className="character-status">
               <tbody>
                  <tr>
                     <td>Health</td>
                     <td className="character-status-bar character-status-bar__health">
                        <StatusBar value={ this.status.health } maxValue={ this.status.maxHealth }/>
                     </td>
                  </tr>
                  <tr>
                     <td>Magica</td>
                     <td className="character-status-bar character-status-bar__magica">
                        <StatusBar value={ this.status.magica } maxValue={ this.status.maxMagica }/>
                     </td>
                  </tr>
                  <tr>
                     <td>Fatigue</td>
                     <td className="character-status-bar character-status-bar__fatigue">
                        <StatusBar value={ this.status.fatigue } maxValue={ this.status.maxFatigue }/>
                     </td>
                  </tr>
               </tbody>
            </table>
      )
   }
}

export default CharacterStatus;